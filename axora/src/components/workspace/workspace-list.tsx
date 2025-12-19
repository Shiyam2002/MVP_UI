"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Plus,
    Files,
    MessageSquare,
    BarChart3,
    FolderKanban,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { CreateWorkspaceDialog } from "@/src/components/workspace/createWorkspaceDialog"; // ✅ IMPORT

export type Workspace = {
    id: string;
    name: string;
    slug: string;
    description?: string;
    documentsCount: number;
    chatsCount: number;
    insightsCount: number;
    updatedAt: string;
};

interface WorkspaceListProps {
    workspaces: Workspace[];
}

export function WorkspaceList({ workspaces }: WorkspaceListProps) {
    const [open, setOpen] = useState(false);
    const isEmpty = workspaces.length === 0;

    return (
        <>
            {/* 🔥 Dialog mounted once */}
            <CreateWorkspaceDialog open={open} onOpenChange={setOpen} />

            {/* 🟡 EMPTY STATE */}
            {isEmpty ? (
                <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                        <FolderKanban className="h-7 w-7 text-muted-foreground" />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">No workspaces yet</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Create a workspace to organize documents, chat with AI, and generate insights.
                        </p>
                    </div>

                    <Button
                        size="icon"
                        className="h-12 w-12 rounded-full bg-black text-white hover:bg-black/90 transition-all"
                        aria-label="Create workspace"
                        onClick={() => setOpen(true)} // ✅ OPEN DIALOG
                    >
                        <Plus className="h-6 w-6" />
                    </Button>
                </div>
            ) : (
                /* 🟢 WORKSPACE CARDS */
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Your Workspaces
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Choose a workspace to start working with documents, chat, and insights.
                            </p>
                        </div>

                        {/* Floating Create Workspace Button */}
                        <Button
                            size="icon"
                            className="
                fixed top-10 right-6 z-40
                h-12 w-12 rounded-full
                bg-black text-white
                hover:bg-black/90
                hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]
                transition-all cursor-pointer
              "
                            aria-label="Create workspace"
                            onClick={() => setOpen(true)} // ✅ OPEN DIALOG
                        >
                            <Plus className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Workspace grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {workspaces.map((workspace) => (
                            <Link
                                key={workspace.id}
                                href={`/workspace/${workspace.slug}`}
                                className="group relative"
                            >
                                <Card
                                    className="
                    h-full overflow-hidden rounded-2xl border 
                    bg-background transition-all
                    hover:-translate-y-0.5 hover:shadow-lg
                    hover:border-primary/40
                  "
                                >
                                    <CardContent className="flex h-full flex-col gap-5 p-5">
                                        {/* Top section */}
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <FolderKanban className="h-5 w-5" />
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="truncate text-base font-semibold leading-tight">
                                                    {workspace.name}
                                                </h3>

                                                {workspace.description && (
                                                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                                        {workspace.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="mt-auto grid grid-cols-3 gap-3 rounded-xl bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <Files className="h-3.5 w-3.5" />
                                                <span>{workspace.documentsCount} Docs</span>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <MessageSquare className="h-3.5 w-3.5" />
                                                <span>{workspace.chatsCount} Chats</span>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <BarChart3 className="h-3.5 w-3.5" />
                                                <span>{workspace.insightsCount} Insights</span>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="text-xs text-muted-foreground">
                                            Updated {workspace.updatedAt}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
