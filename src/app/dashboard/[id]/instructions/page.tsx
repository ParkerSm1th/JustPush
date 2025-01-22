import { Metadata } from "next";
import InstructionForm from "../../../../components/forms/instructions-form";
import { prisma } from "../../../../lib/db";
import { redirect } from "next/navigation";
import { updateInstructionsAction } from "../../../../actions/update-instructions";
import { currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Instructions",
  description: "Manage your repo instructions",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }

  const id = (await params).id;
  const repo = await prisma.repository.findUnique({
    where: {
      id,
      AND: {
        Users: {
          some: {
            userId: user.id,
          },
        },
      },
    },
  });

  if (!repo) {
    return redirect("/dashboard");
  }

  return (
    <InstructionForm
      instructions={repo.instructions}
      updateInstructions={async (data) => {
        "use server";
        await updateInstructionsAction(data, id);
      }}
    />
  );
}
