export type AuthErrorCode =
    | "INVALID_CREDENTIALS"
    | "ACCOUNT_DISABLED"
    | "EMAIL_ALREADY_EXISTS";

export class AuthError extends Error {
    constructor(public code: AuthErrorCode, message?: string) {
        super(message);
        this.name = "AuthError";
    }
}
