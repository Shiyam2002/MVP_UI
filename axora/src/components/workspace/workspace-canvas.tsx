"use client";

import React from "react";
import {
    Plus,
    Upload,
    MessageSquare,
    FileText,
    Lightbulb,
    ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

type ChatRoom = { id: string; name: string };
type Document = { id: string; name: string };
type Insight = { id: string; title: string };

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
            <header className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight">
                    {workspaceName}
                </h1>

                {description && (
                    <p className="max-w-3xl text-sm text-muted-foreground">
                        {description}
                    </p>
                )}

                <div className="h-px w-full bg-linear-to-r from-primary/40 to-transparent" />
            </header>

            {/* ================= QUICK ACTIONS ================= */}
            <div className="flex gap-3">
                <ActionButton icon={Plus} label="New chat room" />
                <ActionButton icon={Upload} label="Upload document" />
            </div>

            {/* ================= MAIN LAYOUT ================= */}
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                {/* ================= CHAT ROOMS (PRIMARY) ================= */}
                <Surface
                    title="Chat Rooms"  
                    icon={MessageSquare}
                    primary
                    emptyLabel="Start conversations with your workspace knowledge"
                >
                    {chatRooms.map((room) => (
                        <InteractiveRow key={room.id} label={room.name} />
                    ))}
                </Surface>

                {/* ================= SECONDARY COLUMN ================= */}
                <div className="space-y-8">
                    <Surface
                        title="Documents"
                        icon={FileText}
                        emptyLabel="Drop files to build workspace context"
                    >
                        {documents.map((doc) => (
                            <InteractiveRow key={doc.id} label={doc.name} />
                        ))}
                    </Surface>

                    <Surface
                        title="Insights"
                        icon={Lightbulb}
                        emptyLabel="AI-generated insights will appear here"
                    >
                        {insights.map((i) => (
                            <InteractiveRow key={i.id} label={i.title} />
                        ))}
                    </Surface>
                </div>
            </div>
        </div>
    );
}

/* ================= SURFACE ================= */

function Surface({
    title,
    icon: Icon,
    primary,
    emptyLabel,
    children,
}: {
    title: string;
    icon: LucideIcon;
    primary?: boolean;
    emptyLabel: string;
    children: React.ReactNode;
}) {

    const hasItems = React.Children.count(children) > 0;

    return (
        <section
            className={cn(
                "group rounded-xl bg-muted/30 p-4 transition",
                "hover:bg-muted/40",
                primary && "bg-muted/40"
            )}
        >
            <div className="mb-4 flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-medium">{title}</h2>
            </div>

            {hasItems ? (
                <div className="space-y-1">{children}</div>
            ) : (
                <EmptyInteractive label={emptyLabel} />
            )}
        </section>
    );
}

/* ================= ROW ================= */

function InteractiveRow({ label }: { label: string }) {
    return (
        <div className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition hover:bg-background">
            <span className="truncate">{label}</span>

            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
        </div>
    );
}

/* ================= EMPTY ================= */

function EmptyInteractive({ label }: { label: string }) {
    return (
        <div className="flex min-h-[72px] items-center justify-center rounded-lg border border-dashed text-center text-sm text-muted-foreground">
            {label}
        </div>
    );
}

/* ================= ACTION ================= */

function ActionButton({
    icon: Icon,
    label,
}: {
        icon: LucideIcon;
    label: string;
}) {
    return (
        <Button
            variant="secondary"
            className="group gap-2 rounded-full px-4"
        >
            <Icon className="h-4 w-4" />
            <span className="text-sm">{label}</span>
        </Button>
    );
}
