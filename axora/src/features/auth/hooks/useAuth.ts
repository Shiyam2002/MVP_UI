"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { AuthService } from "../auth.service";
import { AuthError } from "../auth.error";
import { AUTH_ERROR_MESSAGES } from "../auth.constants";
import { SignInPayload, SignUpPayload } from "../auth.types";

export function useAuth() {
    const router = useRouter();
    const [loading, setloading] = useState(false);

    const signIn = async (data: SignInPayload, redirect: string) => {
        try {
            setloading(true);
            await AuthService.login(data);
            toast.success("Logged in successfully");
            console.log("Redirecting to:", redirect);
            router.push(redirect);
        } catch (err: unknown) {
            if (err instanceof AuthError) {
                toast.error(AUTH_ERROR_MESSAGES[err.code]);
            } else {
                toast.error(AUTH_ERROR_MESSAGES.DEFAULT);
            }
        } finally {
            setloading(false);
        }
    };

    const signUp = async (data: SignUpPayload) => {
        try {
            setloading(true);
            await AuthService.signup(data);
            toast.success("Account created successfully");
        } catch (err: unknown) {
            if (err instanceof AuthError) {
                toast.error(AUTH_ERROR_MESSAGES[err.code]);
            } else {
                toast.error(AUTH_ERROR_MESSAGES.DEFAULT);
            }
            throw err;
        } finally {
            setloading(false);
        }
    };

    return { signIn, signUp, loading };
}