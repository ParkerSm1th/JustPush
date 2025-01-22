import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/db";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "../../components/ui/button";
import { Github } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import Link from "next/link";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }

  const repos = await prisma.repository.findMany({
    where: {
      Users: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  console.log(repos, user.id);

  if (repos.length) {
    redirect(`/dashboard/${repos[0].id}`);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Ready to kill those annoying tasks?
          </h1>
          <p className="text-2xl text-muted-foreground">
            Let&apos;s get started
          </p>
        </div>
        <div className="flex flex-col items-center space-y-8">
          <Link href="https://github.com/apps/just-push/installations/new">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 text-lg h-12 px-6"
            >
              <Github className="mr-2 h-5 w-5" />
              Add Just Push to Github
            </Button>
          </Link>
          <Separator />
          <div className="flex flex-col items-center space-y-4">
            <p className="text-sm">
              Expecting to see a connected repo? Try refreshing this page
            </p>
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
