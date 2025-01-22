import { Metadata } from "next";
import { SidebarNav } from "../../../../components/sidebar-nav";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your repo settings",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const id = (await params).id;

  const sidebarNavItems = [
    {
      title: "General",
      href: `/dashboard/${id}/settings`,
    },
    {
      title: "Usage",
      href: `/dashboard/${id}/settings/usage`,
    },
  ];

  return (
    <>
      <div className="space-y-6 p-10 pb-16 block">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
