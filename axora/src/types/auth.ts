export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}    