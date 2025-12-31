/* =========================
   Document Upload Types
   ========================= */

type WorkspaceDocument = {
    id: string; // UUID
    name: string;
};


export interface PresignedUploadInitRequest {
    fileName: string;
    fileType: string;     // pdf, docx, png, original
    mimeType: string;     // application/pdf
    sizeInBytes: number;
}

export interface PresignedUploadInitResponse {
    documentId: string;
    versionId: string;
    objectKey: string;
    uploadUrl: string;
    expiresInMinutes: number;
}

export interface PresignedUploadCompleteRequest {
    versionId: string;
    objectKey: string;
    checksum?: string;
}


export interface CreateDocumentRequest {
    workspaceId: string;
    title: string;
    description?: string;
    documentType: string;
}

export interface CreateDocumentResponse {
    id: string;
    title: string;
}