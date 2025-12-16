import React from "react";
import { WorkspaceList, Workspace } from "@/src/components/workspace/workspace-list";
import { createWorkspaceSlug } from "@/src/lib/slug";

const mockWorkspaces: Workspace[] = [
  {
    id: "1",
    name: "Contract Review – Q4",
    slug: createWorkspaceSlug("Contract Review – Q4"),
    description: "Legal risk analysis for vendor contracts",
    documentsCount: 12,
    chatsCount: 4,
    insightsCount: 6,
    updatedAt: "2 hours ago",
  },
  {
    id: "2",
    name: "Research Analysis",
    slug: createWorkspaceSlug("Research Analysis"),
    description: "AI-assisted research on LLM evaluation",
    documentsCount: 8,
    chatsCount: 3,
    insightsCount: 5,
    updatedAt: "Yesterday",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <WorkspaceList workspaces={mockWorkspaces} />
      </div>
    </div>
  );
}
