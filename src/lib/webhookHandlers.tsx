import { Octokit } from "octokit";
import {
  CreateEvent,
  InstallationCreatedEvent,
  InstallationDeletedEvent,
  InstallationRepositoriesEvent,
  User,
} from "../types/octokit";
import { prisma } from "./db";
import { getLLMProvider, invokeLLMChain } from "./ai/interactions";
import {
  generateInstructions,
  generateTitleAndDescription,
} from "./ai/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { isDefined } from "./util";
import { parseJson } from "./util/json.util";
import { z } from "zod";
import { isErr } from "./util/result.util";

export const ResponseSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const handleCreate = async (payload: CreateEvent, octokit: Octokit) => {
  if (payload.ref_type !== "branch") {
    return;
  }

  const user = await findOrCreateSender(payload.sender, octokit);
  if (!user) {
    console.log("Aborting because user not found");
    return;
  }

  const repository = await prisma.repository.findUnique({
    where: {
      url: payload.repository.full_name,
    },
  });

  if (!repository) {
    console.log("Aborting because repository not found");
    return;
  }

  const member = await prisma.userRespositoryMembership.findFirst({
    where: {
      userId: user.id,
      repositoryId: repository.id,
    },
  });

  if (!member) {
    console.log("Adding user as a member");
    await prisma.userRespositoryMembership.create({
      data: {
        repositoryId: repository.id,
        userId: user.id,
        role: "MEMBER",
      },
    });
    return;
  }

  const commits = await getBranchChanges(octokit, {
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    branch: payload.ref,
    base: payload.repository.default_branch,
  });

  const changes = commits
    .map(
      (commit) => `
- Commit message: ${commit.message}
  - File changes:
  ${commit.changes
    .map(
      (change) => `
    - ${change.filename}
      - Status: ${change.status}
      - Additions: ${change.additions}
      - Deletions: ${change.deletions}
      - Changes: ${change.changes}
      - Patch: "${change.patch}"
    `
    )
    .join("\n")}
  `
    )
    .join("\n");

  const llm = getLLMProvider({
    maxTokens: 5000,
    temperature: 0.5,
    provider: "openai",
    respondWithJson: true,
  });

  const result = await invokeLLMChain({
    llm,
    promptMessages: generateTitleAndDescription({
      instructions: repository.instructions,
      changes,
      branchName: payload.ref,
    }),
    parser: new StringOutputParser(),
  });

  console.log("Result from LLM", result);
  const response = parseJson(ResponseSchema, result);

  if (isErr(response)) {
    console.log("Error parsing response", response.error);
    return;
  }

  // Create the pull request
  const createdPullRequest = await octokit.rest.pulls.create({
    base: payload.repository.default_branch,
    head: payload.ref,
    owner: payload.sender.login,
    repo: payload.repository.name,
    title: response.value.title,
    body: response.value.description,
  });

  // Assign the pull request to the user who created it
  await octokit.rest.issues.addAssignees({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    issue_number: createdPullRequest.data.number,
    assignees: [payload.sender.login],
  });

  await prisma.usage.create({
    data: {
      repositoryId: repository.id,
      userId: user.id,
    },
  });
};

export const handleInstall = async (
  payload: InstallationCreatedEvent | InstallationDeletedEvent,
  octokit: Octokit
) => {
  // See if the user can even access our service
  const user = await findSender(payload.sender);
  if (!user) {
    console.log("no user", payload);
    return;
  }

  if (!payload.repositories) {
    console.log("no repos", payload);
    return;
  }

  const repositoryUrls = payload.repositories.map((repo) => repo.full_name);

  if (payload.action === "deleted") {
    console.log("Deleting repositories");
    // Delete the repository connection for the user
    const count = await prisma.userRespositoryMembership.deleteMany({
      where: {
        repository: {
          url: {
            in: repositoryUrls,
          },
        },
        AND: {
          userId: user.id,
        },
      },
    });

    console.log("done", count);

    return;
  }

  console.log("creating repositories");

  // Create the repository connection for the user
  for (const payloadRepo of payload.repositories) {
    let repo = await prisma.repository.findUnique({
      where: {
        url: payloadRepo.full_name,
      },
    });
    // We need to keep the function alive
    let addInstructions = false;

    if (!repo) {
      console.log("repo not found, creating & adding instructions");
      repo = await prisma.repository.create({
        data: {
          name: payloadRepo.name,
          url: payloadRepo.full_name,
          // todo(parker): Learn how to ingest instructions from the repo
          instructions: "",
          status: "PENDING",
        },
      });
      addInstructions = true;
    }

    console.log("repo", repo);

    await prisma.userRespositoryMembership.create({
      data: {
        repositoryId: repo.id,
        userId: user.id,
        role: "MEMBER",
      },
    });

    console.log("added member");

    if (addInstructions) {
      await addInstructionsToRepo({
        repoAdded: payloadRepo,
        repoId: repo.id,
        octokit,
      });
    }
  }
};

export const handleRepoInstall = async (
  payload: InstallationRepositoriesEvent,
  octokit: Octokit
) => {
  const user = await findSender(payload.sender);
  if (!user) {
    return;
  }

  for (const repoAdded of payload.repositories_added) {
    let repo = await prisma.repository.findUnique({
      where: {
        url: repoAdded.full_name,
      },
    });
    // We need to keep the function alive
    let addInstructions = false;

    if (!repo) {
      console.log("repo not found, creating & adding instructions");
      repo = await prisma.repository.create({
        data: {
          name: repoAdded.name,
          url: repoAdded.full_name,
          // todo(parker): Learn how to ingest instructions from the repo
          instructions: "",
          status: "PENDING",
        },
      });
      addInstructions = true;
    }

    await prisma.userRespositoryMembership.create({
      data: {
        repositoryId: repo.id,
        userId: user.id,
        role: "MEMBER",
      },
    });

    console.log("added member");

    if (addInstructions) {
      await addInstructionsToRepo({
        repoAdded,
        repoId: repo.id,
        octokit,
      });
    }
  }

  if (payload.repositories_removed.length) {
    const removedRepositoryUrls = payload.repositories_removed.map(
      (repo) => repo.full_name
    );

    const count = await prisma.userRespositoryMembership.deleteMany({
      where: {
        repository: {
          url: {
            in: removedRepositoryUrls,
          },
        },
        AND: {
          userId: user.id,
        },
      },
    });

    console.log("done", count);
  }
};

export const findSender = async (payload: User) => {
  console.log("Finding sender", payload);
  return prisma.user.findUnique({
    where: {
      githubId: `${payload.id}`,
    },
  });
};

export const findOrCreateSender = async (payload: User, octokit: Octokit) => {
  console.log("Finding or creating sender", payload);
  const user = await prisma.user.findUnique({
    where: {
      githubId: `${payload.id}`,
    },
  });

  if (user) {
    return user;
  }

  console.log("no user, creating");

  const { data: githubAccount } = await octokit.rest.users.getByUsername({
    username: payload.login,
  });

  const newUser = await prisma.user.create({
    data: {
      email: githubAccount.email ?? "",
      username: payload.login,
      name: githubAccount.name ?? "",
      githubId: `${payload.id}`,
    },
  });
  return newUser;
};

async function getInstructionContext(
  owner: string,
  repo: string,
  octokit: Octokit
): Promise<string> {
  const possiblePaths = [
    ".github/PULL_REQUEST_TEMPLATE.md",
    ".github/pull_request_template.md",
    "docs/PULL_REQUEST_TEMPLATE.md",
    ".github/pull_request_template/",
    "CONTRIBUTING.md",
  ];

  let instructionContent = "";

  for (const path of possiblePaths) {
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
      });

      if (Array.isArray(data)) {
        // Handle if the path is a directory (e.g., multiple templates)
        console.log("Multiple templates found:", data);
        // return data.map((file) => file.path);
        continue;
      }

      if (data.type !== "file") {
        continue;
      }

      // Decode base64 content
      const content = Buffer.from(data.content, "base64").toString("utf-8");
      instructionContent += `File: ${path}, Content:\n${content}\n\n`;
    } catch {
      console.log(`Template not found at ${path}`);
      continue;
    }
  }

  return instructionContent;
}

async function addInstructionsToRepo({
  repoAdded,
  repoId,
  octokit,
}: {
  repoAdded: {
    full_name: string;
    name: string;
  };
  repoId: string;
  octokit: Octokit;
}) {
  const instructionContent = await getInstructionContext(
    repoAdded.full_name.split("/")[0],
    repoAdded.name,
    octokit
  );

  console.log("found content", instructionContent);

  const llm = getLLMProvider({
    maxTokens: 5000,
    temperature: 0.5,
    provider: "openai",
  });

  console.log("made llm", llm);

  const instructions = await invokeLLMChain({
    llm,
    promptMessages: generateInstructions({
      context: instructionContent,
    }),
    parser: new StringOutputParser(),
  });

  console.log("instructions", instructions);

  await prisma.repository.update({
    where: {
      id: repoId,
    },
    data: {
      instructions,
      status: "ACTIVE",
    },
  });

  console.log("updated repo", repoId);
}

async function getBranchChanges(
  octokit: Octokit,
  {
    owner,
    repo,
    branch,
    base,
  }: {
    owner: string;
    repo: string;
    branch: string;
    base: string;
  }
) {
  try {
    // Step 1: Compare the branch to the base branch and get the commits
    const { data } = await octokit.rest.repos.compareCommits({
      owner,
      repo,
      base,
      head: branch, // The source branch
    });

    const commits = data.commits;

    // Step 2: Fetch changes for each commit, including file diffs
    const changes = await Promise.all(
      commits.map(async (commit) => {
        try {
          const { data: commitData } = await octokit.rest.repos.getCommit({
            owner,
            repo,
            ref: commit.sha,
          });

          if (!commitData.files) {
            return undefined; // Skip if no file changes
          }

          const changes = commitData.files.map((file) => ({
            filename: file.filename,
            status: file.status,
            additions: file.additions,
            deletions: file.deletions,
            changes: file.changes,
            patch: file.patch || "", // Include patch or fallback to empty string
          }));

          return {
            message: commit.commit.message,
            changes,
          };
        } catch (error) {
          console.error(
            `Error fetching details for commit ${commit.sha}:`,
            error
          );
          return undefined; // Skip this commit on error
        }
      })
    );

    // Filter out null values from the results
    return changes.filter(isDefined);
  } catch (error) {
    console.error("Error fetching branch changes:", error);
    throw error;
  }
}
