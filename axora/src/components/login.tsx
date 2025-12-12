"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Separator } from "@/src/components/ui/separator";

import GitHubIcon from "@/src/components/icon/GitHub";
import GoogleIcon from "@/src/components/icon/Google";
import Logo from "./icon/Axora";
import SmoothWavyCanvas from "./ui/SmoothWavyCanvas";

export default function Login04() {
    return (
        <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden flex">

                {/* LEFT SIDE — 60% matching ATG style */}
                <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden flex-col justify-between p-12">
                    <SmoothWavyCanvas
                        backgroundColor="#faf6e9ff"
                        primaryColor="10, 10, 10"
                        secondaryColor="30, 30, 30"
                        accentColor="50,50,50"
                        lineOpacity={1.5}
                        animationSpeed={0.004}
                    />

                    {/* Logo + Branding */}
                    <div className="relative z-10 flex items-center gap-2">
                        <Logo className="h-8 w-8 text-gray-900" />
                        <h1 className="text-2xl font-semibold text-gray-900">Axora</h1>
                    </div>

                    {/* Message Text */}
                    <p className="relative z-10 text-gray-700 text-lg max-w-md">
                        Empower your productivity with Axora — your intelligent work companion.
                    </p>
                </div>

                {/* RIGHT SIDE — 40% login form */}
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

                        {/* Social Login */}
                        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                            <Button variant="outline" className="flex-1 space-x-2 py-2" asChild>
                                <a href="#">
                                    <GitHubIcon className="size-5" />
                                    <span className="text-sm font-medium">Login with GitHub</span>
                                </a>
                            </Button>

                            <Button variant="outline" className="flex-1 space-x-2 py-2" asChild>
                                <a href="#">
                                    <GoogleIcon className="size-4" />
                                    <span className="text-sm font-medium">Login with Google</span>
                                </a>
                            </Button>
                        </div>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">
                                    or
                                </span>
                            </div>
                        </div>

                        {/* Email + Password */}
                        <form className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </Label>
                                <Input id="email" type="email" placeholder="user@domain.com" className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </Label>
                                <Input id="password" type="password" placeholder="********" className="mt-2" />
                            </div>

                            <Button type="submit" className="mt-4 w-full py-2 font-medium">
                                Sign in
                            </Button>
                        </form>

                        {/* Forgot Password */}
                        <p className="mt-6 text-sm text-gray-600 text-center">
                            Forgot your password?{" "}
                            <a href="#" className="font-medium text-gray-900 hover:underline">
                                Reset password
                            </a>
                        </p>

                        {/* Sign up link */}
                        <p className="mt-3 text-sm text-gray-600 text-center">
                            Don&apos;t have an account?{" "}
                            <a href="#" className="font-medium text-gray-900 hover:underline">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
