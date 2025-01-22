import { ChevronsUpDown, LoaderCircleIcon, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";
import { prisma } from "../../lib/db";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "../../lib/utils";

export async function RepoList({ currentRepoId }: { currentRepoId: string }) {
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
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!repos.length) {
    return redirect("https://github.com/apps/just-push/installations/new");
  }

  const currentRepo = repos.find((repo) => repo.id === currentRepoId);

  if (!currentRepo) {
    return redirect(`/dashboard/${repos[0].id}`);
  }

  // Get the current path segments after /dashboard/{repoId}
  // In Next.js server components, we can get the current path segments from headers()
  const resolvedHeaders = await headers();
  const pathSegments =
    resolvedHeaders
      .get("x-clerk-clerk-url")
      ?.split(`/dashboard/${currentRepoId}`)[1] || "/";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold">{currentRepo.name}</span>
                <span className="truncate text-xs">{currentRepo.url}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Repositories
            </DropdownMenuLabel>
            {repos
              .filter((a) => a.id !== currentRepoId)
              .map((repo) => (
                <Link
                  key={repo.id}
                  href={`/dashboard/${repo.id}${pathSegments}`}
                  className={cn("cursor-pointer ", {
                    ["text-muted-foreground opacity-20 cursor-none pointer-events-none"]:
                      repo.status === "PENDING",
                  })}
                >
                  <DropdownMenuItem
                    key={repo.name}
                    className="gap-2 p-2 flex items-center cursor-pointer"
                  >
                    {repo.status === "PENDING" && (
                      <Tooltip>
                        <TooltipTrigger>
                          <LoaderCircleIcon className="text-muted-foreground h-[16px] w-[16px] animate-spin" />
                        </TooltipTrigger>
                        <TooltipContent>
                          This repository is being added
                        </TooltipContent>
                      </Tooltip>
                    )}
                    <span>{repo.url}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
            <DropdownMenuSeparator />
            <Link href="https://github.com/apps/just-push/installations/new">
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Add repo
                </div>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
