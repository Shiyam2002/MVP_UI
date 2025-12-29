import { apiPost, apiGet } from "../lib/api";
import { setCookie, deleteCookie } from "../lib/cookies";
import type { ChatRoom, createWorkspacePayload, Insight, WorkspaceDetails, WorkspaceDocument, WorkspaceResponse } from "../types/workspace.type";

export const WorkspaceService = {

    async createWorkspace(payload: createWorkspacePayload): Promise<WorkspaceResponse> {
        const response = await apiPost("/api/v1/workspaces", payload);
        return response as WorkspaceResponse;
    },

    async getWorkspaceList(): Promise<WorkspaceResponse[]> {
        const response = await apiGet("/api/v1/workspaces/list");
        return response as WorkspaceResponse[];
    },

    async getWorkspaceDetails(workspaceId: string): Promise<WorkspaceDetails> {
        return (await apiGet(`/api/v1/workspaces/${workspaceId}`)) as WorkspaceDetails;
    },

    async getChatRooms(workspaceId: string): Promise<ChatRoom[]> {
        return (await apiGet(`/api/v1/workspaces/${workspaceId}/chatrooms`)) as ChatRoom[];
    },

    async getDocuments(workspaceId: string): Promise<WorkspaceDocument[]> {
        return (await apiGet(`/api/v1/workspaces/${workspaceId}/documents`)) as WorkspaceDocument[];
    },

    async getInsights(workspaceId: string): Promise<Insight[]> {
        return (await apiGet(`/api/v1/workspaces/${workspaceId}/insights`)) as Insight[];
    },

    async deleteWorkspace(workspaceId: string): Promise<void> {
        await apiPost(`/api/v1/workspaces/${workspaceId}/delete`, {});
    }
};