"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import {
    Plus,
    Upload,
    MessageSquare,
    FileText,
    Lightbulb,
} from "lucide-react";

type ChatRoom = {
    id: string;
    name: string;
};

type Document = {
    id: string;
    name: string;
};

type Insight = {
    id: string;
    title: string;
};

interface WorkspaceCanvasProps {
    workspaceName: string;
    description?: string;
    chatRooms: ChatRoom[];
    documents: Document[];
    insights: Insight[];
}

export function WorkspaceCanvas({
    workspaceName,
    description,
    chatRooms,
    documents,
    insights,
}: WorkspaceCanvasProps) {
    return (
        <div className="space-y-10">
            {/* ================= HEADER ================= */}
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                    {workspaceName}
                </h1>
                {description && (
                    <p className="text-sm text-muted-foreground max-w-2xl">
                        {description}
                    </p>
                )}
            </div>

            {/* ================= ACTION BAR ================= */}
            <div className="flex flex-wrap gap-3">
                <Button className="rounded-full bg-black text-white hover:bg-black/90">
                    <Plus className="mr-2 h-4 w-4" />
                    New Chat Room
                </Button>

                <Button variant="outline" className="rounded-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                </Button>
            </div>

            {/* ================= CHAT ROOMS ================= */}
            <section className="space-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-muted-foreground">
                        Chat Rooms
                    </h2>
                </div>

                {chatRooms.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No chat rooms yet. Create one to start discussing with AI.
                    </p>
                ) : (
                    <ul className="space-y-2">
                        {chatRooms.map((chat) => (
                            <li
                                key={chat.id}
                                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted/40"
                            >
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                {chat.name}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* ================= DOCUMENTS ================= */}
            <section className="space-y-3">
                <h2 className="text-sm font-medium text-muted-foreground">
                    Documents
                </h2>

                {documents.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No documents uploaded yet.
                    </p>
                ) : (
                    <ul className="space-y-2">
                        {documents.map((doc) => (
                            <li
                                key={doc.id}
                                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted/40"
                            >
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                {doc.name}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* ================= INSIGHTS ================= */}
            <section className="space-y-3">
                <h2 className="text-sm font-medium text-muted-foreground">
                    Insights
                </h2>

                {insights.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No insights generated yet.
                    </p>
                ) : (
                    <ul className="space-y-2">
                        {insights.map((insight) => (
                            <li
                                key={insight.id}
                                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted/40"
                            >
                                <Lightbulb className="h-4 w-4 text-muted-foreground" />
                                {insight.title}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
