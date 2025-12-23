import { apiPost, apiGet } from "../lib/api";
import { setCookie, deleteCookie } from "../lib/cookies";
import type { ChatRoom, createWorkspacePayload, Insight, WorkspaceDetails, WorkspaceDocument, WorkspaceResponse } from "../types/workspace";

export const WorkspaceService = {
    
    async createWorkspace(payload: createWorkspacePayload): Promise<WorkspaceResponse> {
        const response = await apiPost("/api/workspaces", payload);
        return response as WorkspaceResponse;
    },

    async getWorkspaceList(): Promise<WorkspaceResponse[]> {
        const response = await apiGet("/api/workspaces/list");
        return response as WorkspaceResponse[];
    },

    async getWorkspaceDetails(workspaceId: string): Promise<WorkspaceDetails> {
        return (await apiGet(`/api/workspaces/${workspaceId}`)) as WorkspaceDetails;
    },

    async getChatRooms(workspaceId: string): Promise<ChatRoom[]> {
        return (await apiGet(`/api/workspaces/${workspaceId}/chatrooms`)) as ChatRoom[];
    },

    async getDocuments(workspaceId: string): Promise<WorkspaceDocument[]> {
        return (await apiGet(`/api/workspaces/${workspaceId}/documents`)) as WorkspaceDocument[];
    },

    async getInsights(workspaceId: string): Promise<Insight[]> {
        return (await apiGet(`/api/workspaces/${workspaceId}/insights`)) as Insight[];
    },

    async deleteWorkspace(workspaceId: string): Promise<void> {
        await apiPost(`/api/workspaces/${workspaceId}/delete`, {});
    }
};