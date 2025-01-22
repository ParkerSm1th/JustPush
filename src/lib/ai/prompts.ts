import {
  BaseMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";

export function generateInstructions({
  context,
}: {
  context: string;
}): BaseMessage[] {
  const systemMessagePrompt = `
You MUST FOLLOW ALL following IMPORTANT instructions:

<info>
  - You are an advanced AI assistant helping an AI assistant by generating instructions on how to create the title and pull request for merge requests
  - You are designed to look at the given context based on files in a repository to ensure the next AI assistant can create the title and pull request for merge requests
  - You are designed to provide accurate responses
  - You are designed to help create instructions that will result in a consistent and high quality pull request
  - The next AI assistant won't have access to any of this context or PR templates, so ensure you give them the information they need to create the title and pull request for merge requests
  - Don't include things like 'be accurate' or 'be helpful' in your instructions
  - If the context or template uses a certain format, you should include that in your instructions
</info>

<response>
  - You MUST only respond with the instructions
  - You MUST NOT respond with any other information
</response>
`;

  const systemMessage = new SystemMessage({
    content: systemMessagePrompt,
  });

  const humanMessage = new HumanMessage({
    content: [
      {
        type: "text",
        text: `Generate instructions for this repo, here is the context we were able to find in the repo. It tells you what file it was and then the content, if there is none, follow general guidelines:
        
        ${context}`,
      },
    ],
  });

  return [systemMessage, humanMessage];
}

export function generateTitleAndDescription({
  instructions,
  changes,
  branchName,
}: {
  instructions: string;
  changes: string;
  branchName: string;
}): BaseMessage[] {
  const systemMessagePrompt = `
You MUST FOLLOW ALL following IMPORTANT instructions:

<info>
  - You are an advanced AI assistant helping to generate a title and description for a Pull Request for a user
  - You are designed to look at the changes given, and the instructions given to generate a title and description for the PR
  - You are designed to provide accurate responses
  - You are designed to follow the specifications on creating the title and description
</info>

<response>
  - You MUST only respond with the description and title
  - You MUST NOT respond with any other information
  - You MUST follow the specifications on creating the title and description
</response>

<specifications>
  ${instructions}
</specifications>

<response_format>
Return the description and title in the following example JSON format:
{{
  description: "The description of the PR",
  title: "The title of the PR"
}}
</response_format>
`;

  const systemMessage = new SystemMessage({
    content: systemMessagePrompt,
  });

  const humanMessage = new HumanMessage({
    content: [
      {
        type: "text",
        text: `Here are the changes that were made in this new branch, "${branchName}", generate a title and description for the PR based on the changes:
        
        ${changes}`,
      },
    ],
  });

  return [systemMessage, humanMessage];
}
