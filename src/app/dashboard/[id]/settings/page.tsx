import { Metadata } from "next";
import { prisma } from "../../../../lib/db";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { Separator } from "../../../../components/ui/separator";
import { leaveRepoAction } from "../../../../actions/update-instructions";
import LeaveRepo from "./components/leave-repo";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your repo settings",
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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General</h3>
        <p className="text-sm text-muted-foreground">
          Update general repo settings, leave the repo
        </p>
      </div>
      <Separator />
      <LeaveRepo
        action={async () => {
          "use server";

          await leaveRepoAction(id);
          return redirect(`/dashboard/${id}`);
        }}
      />
    </div>
  );
}
