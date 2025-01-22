import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { RepoList } from "./repositories/repo-list";

export async function AppSidebar({
  currentRepoId,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  currentRepoId: string;
}) {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <RepoList currentRepoId={currentRepoId} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={[
            {
              title: "Repository Settings",
              url: `/dashboard/${currentRepoId}`,
              isActive: true,
              items: [
                {
                  title: "Home",
                  url: `/dashboard/${currentRepoId}`,
                },
                {
                  title: "Instructions",
                  url: `/dashboard/${currentRepoId}/instructions`,
                },
                {
                  title: "Settings",
                  url: `/dashboard/${currentRepoId}/settings`,
                },
              ],
            },
          ]}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            fullName: user.fullName ?? "",
            imageUrl: user.imageUrl,
            username: user.username ?? "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
