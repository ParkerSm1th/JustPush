import { Metadata } from "next";
import { prisma } from "../../../../../lib/db";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { Separator } from "../../../../../components/ui/separator";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";

export const metadata: Metadata = {
  title: "Settings - Usage",
  description: "Manage your repo usage",
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
        <h3 className="text-lg font-medium">Usage</h3>
        <p className="text-sm text-muted-foreground">
          Manage repo Just Push usage
        </p>
      </div>
      <Separator />
      <div className="flex flex-col space-y-4">
        <Label>Max PRs per User</Label>
        <Input disabled placeholder="100" />
      </div>
    </div>
  );
}
