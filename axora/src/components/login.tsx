"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Separator } from "@/src/components/ui/separator";
import { Checkbox } from "@/src/components/ui/checkbox";

import GitHubIcon from "@/src/components/icon/GitHub";
import GoogleIcon from "@/src/components/icon/Google";
import Logo from "@/src/components/icon/Axora";
import SmoothWavyCanvas from "./ui/SmoothWavyCanvas";

import { AuthService } from "@/src/service/auth.service";

type Mode = "signin" | "signup";

export default function AuthPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get("next") || "/workspace";

    const [mode, setMode] = useState<Mode>("signin");
    const [loading, setLoading] = useState(false);

    /* -------------------- SIGN IN STATE -------------------- */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /* -------------------- SIGN UP STATE -------------------- */
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    /* -------------------- HANDLERS -------------------- */

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Email and password are required");
            return;
        }

        try {
            setLoading(true);
            await AuthService.login({ email, password });
            toast.success("Signed in successfully");
            router.push(next);
        } catch (err: any) {
            if (err.message === "INVALID_CREDENTIALS") {
                toast.error("Invalid email or password");
            } else if (err.message === "ACCOUNT_DISABLED") {
                toast.error("Your account is disabled. Contact support.");
            } else {
                toast.error("Unable to sign in. Please try again.");
            }
        }
        finally {
            setLoading(false);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            await AuthService.signup({ username: name, email, password });
            toast.success("Account created. Please sign in.");
            setMode("signin");
        } catch (err) {
            toast.error("Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden flex">

                {/* LEFT SIDE */}
                <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden flex-col justify-between p-12">
                    <SmoothWavyCanvas
                        backgroundColor="#faf6e9ff"
                        primaryColor="10, 10, 10"
                        secondaryColor="30, 30, 30"
                        accentColor="50,50,50"
                        lineOpacity={1.5}
                        animationSpeed={0.004}
                    />

                    <div className="relative z-10 flex items-center gap-2">
                        <Logo className="h-8 w-8 text-gray-900" />
                        <h1 className="text-2xl font-semibold text-gray-900">Axora</h1>
                    </div>

                    <p className="relative z-10 text-gray-700 text-lg max-w-md">
                        Empower your productivity with Axora — your intelligent work companion.
                    </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full lg:w-[40%] flex items-center justify-center p-8 lg:p-12">
                    <div className="w-full max-w-md">

                        {/* Header */}
                        <div className="text-center space-y-1 mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">
                                {mode === "signin" ? "Welcome Back" : "Create an Account"}
                            </h2>
                            <p className="text-gray-600">
                                {mode === "signin"
                                    ? "Sign in to continue to your workspace"
                                    : "Create a new workspace account"}
                            </p>
                        </div>

                        {/* Social login only for sign in */}
                        {mode === "signin" && (
                            <>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1" disabled>
                                        <GitHubIcon className="size-5" />
                                        GitHub
                                    </Button>
                                    <Button variant="outline" className="flex-1" disabled>
                                        <GoogleIcon className="size-4" />
                                        Google
                                    </Button>
                                </div>

                                <div className="relative my-6">
                                    <Separator />
                                    <span className="absolute inset-x-0 -top-2 mx-auto w-fit bg-white px-2 text-xs text-gray-500">
                                        or
                                    </span>
                                </div>
                            </>
                        )}

                        {/* -------------------- FORMS -------------------- */}

                        {mode === "signin" ? (
                            <form onSubmit={handleSignIn} className="space-y-4">
                                <div>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        className="mt-2"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        className="mt-2"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Signing in..." : "Sign in"}
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={handleSignUp} className="space-y-4">
                                <div>
                                    <Label>Name</Label>
                                    <Input
                                        className="mt-2"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        className="mt-2"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        className="mt-2"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label>Confirm Password</Label>
                                    <Input
                                        type="password"
                                        className="mt-2"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Checkbox />
                                    <span className="text-sm text-gray-600">
                                        Sign up for newsletter
                                    </span>
                                </div>

                                <Button type="submit" className="w-full" disabled={loading}>
                                    Create account
                                </Button>
                            </form>
                        )}

                        {/* Toggle */}
                        <p className="mt-6 text-center text-sm text-gray-600">
                            {mode === "signin" ? (
                                <>
                                    Don&apos;t have an account?{" "}
                                    <button
                                        onClick={() => setMode("signup")}
                                        className="font-medium text-gray-900 hover:underline"
                                    >
                                        Sign up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => setMode("signin")}
                                        className="font-medium text-gray-900 hover:underline"
                                    >
                                        Sign in
                                    </button>
                                </>
                            )}
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}
