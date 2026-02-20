"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Checkbox } from "@/src/components/ui/checkbox";
import { SignUpPayload } from "../auth.types";

interface Props {
    onSubmit: (data: SignUpPayload) => void;
    loading: boolean;
}

export function SignUpForm({ onSubmit, loading }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        onSubmit({ username: name, email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Name</Label>
                <Input className="mt-2" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
                <Label>Email</Label>
                <Input type="email" className="mt-2" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
                <Label>Password</Label>
                <Input type="password" className="mt-2" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                <span className="text-sm text-gray-600">Sign up for newsletter</span>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                Create account
            </Button>
        </form>
    );
}
