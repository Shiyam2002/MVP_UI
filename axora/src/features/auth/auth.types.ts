export interface SignInPayload {
    email: string;
    password: string;
}

export interface SignUpPayload {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}    