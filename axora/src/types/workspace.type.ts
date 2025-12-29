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

export type ChatRoom = {
    id: string;
    name: string;
};

export type WorkspaceDocument = {
    id: string;
    name: string;
};

export type Insight = {
    id: string;
    title: string;
};

export type WorkspaceDetails = {
    id: string;
    name: string;
    description?: string;
};