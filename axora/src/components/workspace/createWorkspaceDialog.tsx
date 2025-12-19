"use client";

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
import { Textarea } from "@/src/components/ui/textarea"; // ✅ ADD

interface CreateWorkspaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateWorkspaceDialog({
  open,
  onOpenChange,
}: CreateWorkspaceDialogProps) {
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

        <form>
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
                required
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
              />
            </div>

            <Button type="submit" className="w-full">
              Create workspace
            </Button>
          </div>

          {/* Private workspace */}
          <div className="border-t bg-muted px-6 py-4 rounded-b-md">
            <div className="flex items-start space-x-3">
              <Switch id="private" />
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
