"use client";

import { Button } from "@/src/components/ui/button";
import GitHubIcon from "@/src/components/icon/GitHub";
import GoogleIcon from "@/src/components/icon/Google";

export function SocialLogin() {
    return (
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
    );
}
