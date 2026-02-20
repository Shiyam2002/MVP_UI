import { apiPost, ApiError } from "@/src/lib/api";
import { AUTH_ROUTES } from "./auth.constants";
import { AuthError } from "./auth.error";
import type { SignInPayload, SignUpPayload, AuthResponse } from "./auth.types";

export const AuthService = {
    async login(payload: SignInPayload): Promise<AuthResponse> {
        try {
            return await apiPost(AUTH_ROUTES.LOGIN, payload);
        } catch (error: unknown) {
            throw this.mapError(error);
        }
    },

    async signup(payload: SignUpPayload): Promise<AuthResponse> {
        try {
            return await apiPost(AUTH_ROUTES.SIGNUP, payload);
        } catch (error: unknown) {
            throw this.mapError(error);
        }
    },

    async logout(): Promise<void> {
        window.location.href = "/";
        // try {
        //     await apiPost("/auth/v1/logout", {});
        // } finally {
        //     window.location.href = "/login";
        // }
    },

    mapError(error: unknown): Error {
        if (error instanceof ApiError) {
            switch (error.status) {
                case 401:
                    return new AuthError("INVALID_CREDENTIALS");
                case 403:
                    return new AuthError("ACCOUNT_DISABLED");
                case 409:
                    return new AuthError("EMAIL_ALREADY_EXISTS");
                default:
                    return new Error("Authentication failed");
            }
        }

        return new Error("Unexpected error occurred");
    },
};
