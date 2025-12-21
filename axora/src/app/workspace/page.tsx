"use client";

import { useEffect, useState } from "react";
import { WorkspaceList, Workspace } from "@/src/components/workspace/workspace-list";
import { WorkspaceService } from "@/src/service/workspace.service";
import { createWorkspaceSlug } from "@/src/lib/slug";

export default function Page() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkspaces() {
      try {
        const data = await WorkspaceService.getWorkspaceList();

        // 🔁 map backend response → UI model
        const mapped: Workspace[] = data.map((ws) => ({
          id: ws.id,
          name: ws.name,
          slug: createWorkspaceSlug(ws.name),
          description: ws.description,
          documentsCount: 0, // backend not ready yet
          chatsCount: 0,
          insightsCount: 0,
          updatedAt: "Just now",
        }));

        setWorkspaces(mapped);
      } catch (err) {
        console.error("Failed to load workspaces", err);
      } finally {
        setLoading(false);
      }
    }

    loadWorkspaces();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading workspaces...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <WorkspaceList workspaces={workspaces} />
      </div>
    </div>
  );
}
