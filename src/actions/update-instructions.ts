import { currentUser } from "@clerk/nextjs/server";
import { InstructionFormFields } from "../components/forms/instructions-form";
import { prisma } from "../lib/db";

export async function updateInstructionsAction(
  data: InstructionFormFields,
  repoId: string
) {
  await prisma.repository.update({
    where: {
      id: repoId,
    },
    data: {
      instructions: data.instructions,
    },
  });
  console.log({ data });
}

export async function leaveRepoAction(repoId: string) {
  const user = await currentUser();

  if (!user) {
    return;
  }

  await prisma.userRespositoryMembership.deleteMany({
    where: {
      repositoryId: repoId,
      userId: user.id,
    },
  });
}
