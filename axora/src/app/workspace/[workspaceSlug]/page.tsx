"use client";

import { useEffect, useState } from "react";
import { WorkspaceCanvas } from "@/src/components/workspace/workspace-canvas";
import { WorkspaceService } from "@/src/service/workspace.service";

type ChatRoom = { id: string; name: string };
type WorkspaceDocument = { id: string; name: string };
type Insight = { id: string; title: string };

export default function Page() {
    const workspaceId = "PUT_REAL_WORKSPACE_UUID_HERE"; // 🔥 must be UUID

    const [documents, setDocuments] = useState<WorkspaceDocument[]>([]);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [insights, setInsights] = useState<Insight[]>([]);
    const [loading, setLoading] = useState(true);

    const workspace = {
        name: "Contract Review – Q4",
        description: "Legal risk analysis for vendor contracts",
    };

    useEffect(() => {
        async function loadWorkspaceData() {
            try {
                const docs = await WorkspaceService.getDocuments(workspaceId);
                setDocuments(docs);

                // optional (can wire later)
                // setChatRooms(await WorkspaceService.getChatRooms(workspaceId));
                // setInsights(await WorkspaceService.getInsights(workspaceId));

            } catch (err) {
                console.error("Failed to load workspace data", err);
            } finally {
                setLoading(false);
            }
        }

        loadWorkspaceData();
    }, [workspaceId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-muted-foreground">
                Loading workspace…
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-muted/30">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <WorkspaceCanvas
                    workspaceId={workspaceId}
                    workspaceName={workspace.name}
                    description={workspace.description}
                    chatRooms={chatRooms}
                    documents={documents}
                    insights={insights}                 />
            </div>
        </div>
    );
}
