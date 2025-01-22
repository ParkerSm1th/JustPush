import { Metadata } from "next";
import { prisma } from "../../../lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { User } from "@prisma/client";

export const metadata: Metadata = {
  title: "Home",
  description: "Manage your instances",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const user = await currentUser();

  if (!user) {
    return null;
  }

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
    include: {
      Users: {
        select: {
          user: true,
        },
      },
    },
  });

  if (!repo) {
    return redirect("/dashboard");
  }

  const totalUses = await prisma.usage.findMany({
    where: {
      repositoryId: id,
    },
  });

  // dedupe repo.users by id
  const dedupedUsers = repo.Users.reduce((acc, { user }) => {
    if (!acc.find((a) => a.id === user.id)) {
      acc.push(user);
    }
    return acc;
  }, [] as User[]).filter((u) => u.id !== user.id);

  return (
    <div className="flex flex-col space-y-8 m-4">
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-bold">{repo.name}</h3>
        <p className="text-sm text-muted-foreground">
          Just Push is installed on {repo.name}! Just Push a new branch and
          we&apos;ll create the PR.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Uses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUses.length}</div>
            <p className="text-xs text-muted-foreground">
              How many times we have created a PR for this repo
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Personal Uses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalUses.filter((u) => u.userId === user.id).length}
            </div>
            <p className="text-xs text-muted-foreground">
              How many times you have created a PR for this repo
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Other users</CardTitle>
          <CardDescription>
            Other people who have utilized Just Push on this repo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-6">
              {dedupedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={`https://github.com/${user.username}.png`}
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
