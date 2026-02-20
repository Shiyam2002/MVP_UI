"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/src/components/ui/separator";

import {
    useAuth,
    SignInForm,
    SignUpForm,
    SocialLogin,
} from "@/src/features/auth";

import { AuthLayout } from "@/src/features/auth/components/AuthLayout";
import { AuthHeader } from "@/src/features/auth/components/AuthHeader";
import { AuthToggle } from "@/src/features/auth/components/AuthToggle";

type Mode = "signin" | "signup";

export default function AuthPage() {
    const searchParams = useSearchParams();
    const next = searchParams.get("next") ?? "/workspace";

    const { signIn, signUp, loading } = useAuth();
    const [mode, setMode] = useState<Mode>("signin");

    const isSignIn = mode === "signin";

    return (
        <AuthLayout>

            <AuthHeader mode={mode} />

            {isSignIn && (
                <>
                    <SocialLogin />
                    <div className="relative">
                        <Separator />
                        <span className="absolute inset-x-0 -top-2 mx-auto w-fit bg-white px-2 text-xs text-gray-500">
                            or
                        </span>
                    </div>
                </>
            )}

            {isSignIn ? (
                <SignInForm
                    onSubmit={(data) => signIn(data, next)}
                    loading={loading}
                />
            ) : (
                <SignUpForm
                    onSubmit={signUp}
                    loading={loading}
                />
            )}

            <AuthToggle
                mode={mode}
                onToggle={() => setMode(isSignIn ? "signup" : "signin")}
            />

        </AuthLayout>
    );
}
