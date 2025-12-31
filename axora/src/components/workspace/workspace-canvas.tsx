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
import { DocumentService } from "@/src/service/document.service";

/* ================= TYPES ================= */

type ChatRoom = { id: string; name: string };
type Document = { id: string; name: string };
type Insight = { id: string; title: string };

interface WorkspaceCanvasProps {
    workspaceId: string;                 // 🔥 REQUIRED
    workspaceName: string;
    description?: string;
    chatRooms: ChatRoom[];
    documents: Document[];
    insights: Insight[];
    onDocumentUploaded?: () => void;     // 🔁 refresh hook
}

/* ================= MAIN ================= */

export function WorkspaceCanvas({
    workspaceId,
    workspaceName,
    description,
    chatRooms,
    documents,
    insights,
    onDocumentUploaded,
}: WorkspaceCanvasProps) {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    /* ================= Upload Handlers ================= */

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelected = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            /* 1️⃣ CREATE DOCUMENT (metadata) */
            const doc = await DocumentService.createDocument({
                workspaceId,
                title: file.name,
                documentType: file.type,
                description: "",
            });

            /* 2️⃣ INIT UPLOAD */
            const init = await DocumentService.initUpload(doc.id, {
                fileName: file.name,
                fileType: "original",
                mimeType: file.type,
                sizeInBytes: file.size,
            });

            /* 3️⃣ UPLOAD FILE (direct → MinIO) */
            await DocumentService.uploadToPresignedUrl(
                init.uploadUrl,
                file
            );

            /* 4️⃣ COMPLETE UPLOAD */
            await DocumentService.completeUpload(doc.id, {
                versionId: init.versionId,
                objectKey: init.objectKey,
            });

            /* 5️⃣ REFRESH DOCUMENT LIST */
            onDocumentUploaded?.();

        } catch (err) {
            console.error("Upload failed", err);
            alert("Upload failed. Please try again.");
        } finally {
            e.target.value = "";
        }
    };

    /* ================= JSX ================= */

    return (
        <div className="space-y-10">

            {/* ================= HEADER ================= */}
            <header className="space-y-4">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        {workspaceName}
                    </h1>
                    {description && (
                        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Button
                        className="
              gap-2 rounded-full px-5
              bg-primary text-primary-foreground
              shadow-sm transition-all duration-200
              hover:-translate-y-px hover:shadow-md hover:bg-primary/90
              active:translate-y-0 active:shadow-sm
              focus-visible:ring-2 focus-visible:ring-primary/40
            "
                    >
                        <Plus className="h-4 w-4" />
                        <span className="text-sm font-medium">New chat room</span>
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={handleUploadClick}
                        className="
              gap-2 rounded-full px-5
              border border-border bg-background
              shadow-sm transition-all duration-200
              hover:-translate-y-px hover:shadow-md hover:bg-muted
              active:translate-y-0 active:shadow-sm
              focus-visible:ring-2 focus-visible:ring-muted-foreground/30
            "
                    >
                        <Upload className="h-4 w-4" />
                        <span className="text-sm font-medium">Upload document</span>
                    </Button>
                </div>

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileSelected}
                />

                <div className="h-px w-full bg-border" />
            </header>

            {/* ================= CONTENT GRID ================= */}
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">

                {/* ================= CHAT ROOMS ================= */}
                <CardSurface
                    title="Chat Rooms"
                    icon={MessageSquare}
                    primary
                    emptyLabel="Start conversations using your workspace knowledge"
                >
                    {chatRooms.map((room) => (
                        <Row key={room.id} label={room.name} />
                    ))}
                </CardSurface>

                {/* ================= RIGHT COLUMN ================= */}
                <div className="space-y-8">
                    <CardSurface
                        title="Documents"
                        icon={FileText}
                        emptyLabel="Upload files to build context"
                    >
                        {documents.map((doc) => (
                            <Row key={doc.id} label={doc.name} />
                        ))}
                    </CardSurface>

                    <CardSurface
                        title="Insights"
                        icon={Lightbulb}
                        emptyLabel="AI-generated insights will appear here"
                    >
                        {insights.map((i) => (
                            <Row key={i.id} label={i.title} />
                        ))}
                    </CardSurface>
                </div>
            </div>
        </div>
    );
}

/* ================= CARD ================= */

function CardSurface({
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
                "rounded-xl border bg-card shadow-sm",
                primary && "ring-1 ring-primary/10"
            )}
        >
            <div className="flex items-center gap-2 border-b px-4 py-3">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-medium">{title}</h2>
            </div>

            <div className="p-2">
                {hasItems ? (
                    <div className="space-y-1">{children}</div>
                ) : (
                    <EmptyState label={emptyLabel} />
                )}
            </div>
        </section>
    );
}

/* ================= ROW ================= */

function Row({ label }: { label: string }) {
    return (
        <div className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition hover:bg-muted">
            <span className="truncate">{label}</span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
        </div>
    );
}

/* ================= EMPTY ================= */

function EmptyState({ label }: { label: string }) {
    return (
        <div className="flex min-h-[88px] items-center justify-center rounded-lg border border-dashed bg-muted/40 text-center text-sm text-muted-foreground">
            {label}
        </div>
    );
}
