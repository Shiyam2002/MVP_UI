import { apiPost } from "@/src/lib/api";
import type {
    LoginPayload,
    SignupPayload,
    AuthResponse,
} from "@/src/types/auth.type";


export const AuthService = {
    async login(payload: LoginPayload): Promise<AuthResponse> {
        return apiPost("/auth/v1/authenticate", payload);
    },

    async signup(payload: SignupPayload): Promise<AuthResponse> {
        return apiPost("/auth/v1/signup", payload);
    },

    async logout() {
        // optional: call backend logout later
        window.location.href = "/login";
    },
};
