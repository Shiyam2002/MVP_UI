import { apiPost, apiGet } from "../lib/api";
import { setCookie, deleteCookie } from "../lib/cookies";
import type { createWorkspacePayload, WorkspaceResponse } from "../types/workspace";

export const WorkspaceService = {
    async createWorkspace(payload: createWorkspacePayload): Promise<WorkspaceResponse> {
        const response = await apiPost("/api/workspaces", payload);
        return response as WorkspaceResponse;
    },
    async getWorkspaceList(): Promise<WorkspaceResponse[]> {
        const response = await apiGet("/api/workspaces/list");
        return response as WorkspaceResponse[];
    }
};