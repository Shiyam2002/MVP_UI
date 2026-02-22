import { apiPost, ApiError, apiGet } from "@/src/lib/api";
import { AUTH_ROUTES } from "./auth.constants";
import { AuthError } from "./auth.errors";
import {
    type SignInPayload,
    type SignUpPayload,
    type AuthResponse,
    type User,
    UserSchema,
    AuthResponseSchema,
} from "./auth.types";

export const AuthService = {
    async login(payload: SignInPayload): Promise<AuthResponse> {
        try {
            const response = await apiPost(AUTH_ROUTES.LOGIN, payload);
            return AuthResponseSchema.parse(response);
        } catch (error: unknown) {
            throw this.mapError(error);
        }
    },

    async signup(payload: SignUpPayload): Promise<AuthResponse> {
        try {
            const response = await apiPost(AUTH_ROUTES.SIGNUP, payload);
            return AuthResponseSchema.parse(response);
        } catch (error: unknown) {
            throw this.mapError(error);
        }
    },

    async getCurrentUser(): Promise<User> {
        try {
            const response = await apiGet(AUTH_ROUTES.CURRENT_USER);
            return UserSchema.parse(response);
        } catch (error: unknown) {
            throw this.mapError(error);
        }
    },

    async logout(): Promise<void> {
        try {
            await apiPost(AUTH_ROUTES.LOGOUT, {});
        } finally {
            window.location.href = "/";
        }
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
