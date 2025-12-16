"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/src/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Brain,
  Files,
  MessageSquare,
  Settings,
  Users,
  FolderKanban,
  FileText,
  BarChart3,
} from "lucide-react";
import { Logo } from "@/src/components/sidebar-03/logo";
import type { Route } from "./nav-main";
import DashboardNavigation from "@/src/components/sidebar-03/nav-main";
import { NotificationsPopover } from "@/src/components/sidebar-03/nav-notifications";
import { TeamSwitcher } from "@/src/components/sidebar-03/team-switcher";

// Example notifications
const sampleNotifications = [
  {
    id: "1",
    avatar: "/avatars/01.png",
    fallback: "SK",
    text: "Workspace 'Legal Review' updated.",
    time: "10m ago",
  },
  {
    id: "2",
    avatar: "/avatars/02.png",
    fallback: "JD",
    text: "New document uploaded to Research workspace.",
    time: "1h ago",
  },
  {
    id: "3",
    avatar: "/avatars/03.png",
    fallback: "AR",
    text: "AI summary generated successfully.",
    time: "2h ago",
  },
];

// 🧠 Contextual routes for your Chat + Document + LLM platform
const dashboardRoutes: Route[] = [
  {
    id: "personal-ai",
    title: "My AI Space",
    icon: <Brain className="size-4" />,
    link: "/me/chat",
  },
  {
    id: "workspaces",
    title: "Workspaces",
    icon: <FolderKanban className="size-4" />,
    link: "/workspace",
  },
  {
    id: "documents",
    title: "Documents",
    icon: <Files className="size-4" />,
    link: "/workspace/documents",
  },
  {
    id: "chat",
    title: "Chat Rooms",
    icon: <MessageSquare className="size-4" />,
    link: "/workspace/chat",
  },
  {
    id: "insights",
    title: "Insights",
    icon: <BarChart3 className="size-4" />,
    link: "/workspace/insights",
  },
  {
    id: "decisions",
    title: "Decisions",
    icon: <FileText className="size-4" />,
    link: "/workspace/decisions",
  },
  {
    id: "members",
    title: "Members",
    icon: <Users className="size-4" />,
    link: "/workspace/members",
  },
  {
    id: "settings",
    title: "Settings",
    icon: <Settings className="size-4" />,
    link: "/workspace/settings",
  },
];

const teams = [
  { id: "1", name: "Legal Review", logo: Logo, plan: "Workspace" },
  { id: "2", name: "Research Analysis", logo: Logo, plan: "Workspace" },
  { id: "3", name: "Contract AI", logo: Logo, plan: "Workspace" },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar variant="floating" collapsible="icon">
      {/* --- Header --- */}
      <SidebarHeader
        className={cn(
          "flex md:pt-3.5",
          isCollapsed
            ? "flex-row items-center justify-between gap-y-4 md:flex-col md:items-start md:justify-start"
            : "flex-row items-center justify-between"
        )}
      >
        <a href="#" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          {!isCollapsed && (
            <span className="font-semibold text-black dark:text-white">
              Axora
            </span>
          )}
        </a>

        <motion.div
          key={isCollapsed ? "header-collapsed" : "header-expanded"}
          className={cn(
            "flex items-center gap-2",
            isCollapsed ? "flex-row md:flex-col-reverse" : "flex-row"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <NotificationsPopover notifications={sampleNotifications} />
          <SidebarTrigger />
        </motion.div>
      </SidebarHeader>

      {/* --- Content --- */}
      <SidebarContent className="gap-4 px-2 py-4">
        <DashboardNavigation routes={dashboardRoutes} />
      </SidebarContent>

      {/* --- Footer --- */}
      <SidebarFooter className="px-2">
        <TeamSwitcher teams={teams} />
      </SidebarFooter>
    </Sidebar>
  );
}
