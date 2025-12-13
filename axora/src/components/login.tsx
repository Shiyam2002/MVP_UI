"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Separator } from "@/src/components/ui/separator";

import GitHubIcon from "@/src/components/icon/GitHub";
import GoogleIcon from "@/src/components/icon/Google";
import Logo from "./icon/Axora";
import SmoothWavyCanvas from "./ui/SmoothWavyCanvas";

import { AuthService } from "@/src/service/auth.service";

export default function Login04() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get("next") || "/dashboard";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
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
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Login failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden flex">

                {/* LEFT SIDE — 60% */}
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

                {/* RIGHT SIDE — 40% */}
                <div className="w-full lg:w-[40%] flex items-center justify-center p-8 lg:p-12">
                    <div className="w-full max-w-md">

                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center gap-2 mb-12">
                            <Logo className="h-7 w-7 text-gray-900" />
                            <h1 className="text-2xl font-semibold text-gray-900">Axora</h1>
                        </div>

                        {/* Header */}
                        <div className="text-center space-y-1 mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                            <p className="text-gray-600">Sign in to continue to your workspace</p>
                        </div>

                        {/* Social Login (placeholders for future OAuth) */}
                        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                            <Button variant="outline" className="flex-1 space-x-2 py-2" disabled>
                                <GitHubIcon className="size-5" />
                                <span className="text-sm font-medium">GitHub (soon)</span>
                            </Button>

                            <Button variant="outline" className="flex-1 space-x-2 py-2" disabled>
                                <GoogleIcon className="size-4" />
                                <span className="text-sm font-medium">Google (soon)</span>
                            </Button>
                        </div>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">or</span>
                            </div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="user@domain.com"
                                    className="mt-2"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    className="mt-2"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full py-2 font-medium"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </Button>
                        </form>

                        {/* Forgot Password */}
                        <p className="mt-6 text-sm text-gray-600 text-center">
                            Forgot your password?{" "}
                            <a href="/forgot-password" className="font-medium text-gray-900 hover:underline">
                                Reset password
                            </a>
                        </p>

                        {/* Sign up */}
                        <p className="mt-3 text-sm text-gray-600 text-center">
                            Don&apos;t have an account?{" "}
                            <a href="/signup" className="font-medium text-gray-900 hover:underline">
                                Sign up
                            </a>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}
