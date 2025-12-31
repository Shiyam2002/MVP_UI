import { apiPost } from "@/src/lib/api";
import {
    PresignedUploadInitRequest,
    PresignedUploadInitResponse,
    PresignedUploadCompleteRequest,
    CreateDocumentRequest,
    CreateDocumentResponse,
} from "@/src/types/document.type";

/* ================= TYPES ================= */



/* ================= SERVICE ================= */

export const DocumentService = {
    /* ================= CREATE DOCUMENT ================= */

    async createDocument(
        payload: CreateDocumentRequest
    ): Promise<CreateDocumentResponse> {
        return (await apiPost(
            "/api/v1/documents",
            payload
        )) as CreateDocumentResponse;
    },

    /* ================= INIT UPLOAD ================= */

    async initUpload(
        documentId: string,
        payload: PresignedUploadInitRequest
    ): Promise<PresignedUploadInitResponse> {
        return (await apiPost(
            `/api/v1/documents/${documentId}/upload/init`,
            payload
        )) as PresignedUploadInitResponse;
    },

    /* ================= DIRECT STORAGE UPLOAD ================= */

    async uploadToPresignedUrl(
        uploadUrl: string,
        file: File
    ): Promise<void> {
        const res = await fetch(uploadUrl, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": file.type || "application/octet-stream",
            },
        });

        if (!res.ok) {
            throw new Error("Failed to upload file to storage");
        }
    },

    /* ================= COMPLETE UPLOAD ================= */

    async completeUpload(
        documentId: string,
        payload: PresignedUploadCompleteRequest
    ): Promise<void> {
        await apiPost(
            `/api/v1/documents/${documentId}/upload/complete`,
            payload
        );
    },
};
