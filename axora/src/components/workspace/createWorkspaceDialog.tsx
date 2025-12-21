"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Switch } from "@/src/components/ui/switch";
import { Textarea } from "@/src/components/ui/textarea";
import { WorkspaceService } from "@/src/service/workspace.service";

interface CreateWorkspaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateWorkspaceDialog({
  open,
  onOpenChange,
}: CreateWorkspaceDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setLoading(true);

      await WorkspaceService.createWorkspace({
        name: name.trim(),
        description: description.trim() || undefined, // ✅ optional
      });

      // ✅ reset & close
      setName("");
      setDescription("");
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      // later: toast.error(err.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-lg">
        <DialogHeader className="px-6 pt-4">
          <DialogTitle>Create workspace</DialogTitle>
          <DialogDescription>
            Workspaces are shared environments where teams can connect to data
            sources, run queries and create reports.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6 pb-4 space-y-4">
            {/* Workspace Name */}
            <div>
              <Label htmlFor="workspace-name">
                Workspace Name<span className="text-destructive">*</span>
              </Label>
              <Input
                id="workspace-name"
                placeholder="My workspace"
                className="mt-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* Description (Optional) */}
            <div>
              <Label htmlFor="workspace-description">
                Description{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="workspace-description"
                placeholder="Describe what this workspace is used for..."
                className="mt-2 resize-none"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !name.trim()}
            >
              {loading ? "Creating..." : "Create workspace"}
            </Button>
          </div>

          {/* Private workspace (future use) */}
          <div className="border-t bg-muted px-6 py-4 rounded-b-md">
            <div className="flex items-start space-x-3">
              <Switch id="private" disabled />
              <div>
                <Label htmlFor="private">Set workspace to private</Label>
                <p className="text-sm text-muted-foreground">
                  Only those invited can access or view
                </p>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
