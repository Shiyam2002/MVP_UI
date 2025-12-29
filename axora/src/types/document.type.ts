/* =========================
   Document Upload Types
   ========================= */

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
