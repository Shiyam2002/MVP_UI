import { z } from "zod";

export const SignInSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignInPayload = z.infer<typeof SignInSchema>;


export const SignUpSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignUpPayload = z.infer<typeof SignUpSchema>;

export const AuthResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export const UserSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.email("Invalid email address"),
    avatarUrl: z.url().optional(),
});

export type User = z.infer<typeof UserSchema>;