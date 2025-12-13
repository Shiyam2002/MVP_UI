import { apiPost } from "@/src/lib/api";
import { setCookie, deleteCookie } from "@/src/lib/cookies";
import type {
    LoginPayload,
    SignupPayload,
    AuthResponse,
} from "@/src/types/auth";

const ACCESS_TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";

export const AuthService = {
    async login(payload: LoginPayload): Promise<AuthResponse> {
        const response = await apiPost("/auth/authenticate", payload);
        const { accessToken, refreshToken } = response as AuthResponse;
        
        setCookie(ACCESS_TOKEN_KEY, accessToken, 1);
        setCookie(REFRESH_TOKEN_KEY, refreshToken, 7);
        
        return response as AuthResponse;
    },

    async signup(payload: SignupPayload): Promise<AuthResponse> {
        const response = await apiPost("/auth/signup", payload);
        const { accessToken, refreshToken } = response as AuthResponse;
        
        setCookie(ACCESS_TOKEN_KEY, accessToken, 1);
        setCookie(REFRESH_TOKEN_KEY, refreshToken, 7);

        return response as AuthResponse;
    },

    async logout() {
        deleteCookie(ACCESS_TOKEN_KEY);
        deleteCookie(REFRESH_TOKEN_KEY);
        window.location.href = "/";
    }
}