import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { DashboardSidebar } from "@/src/components/sidebar-03/app-sidebar";

type Sidebar03Props = {
  children: React.ReactNode;
};

export default function Sidebar03({ children }: Sidebar03Props) {
  return (
    <SidebarProvider>
      <div className="relative flex h-screen w-full">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
