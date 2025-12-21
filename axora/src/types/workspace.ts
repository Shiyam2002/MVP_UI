export interface createWorkspacePayload {
    name: string;
    description?: string;
    //isPublic: boolean;
}

export interface WorkspaceResponse {
    id: string;
    name: string;
    description?: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}