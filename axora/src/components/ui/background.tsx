// src/components/ui/background.tsx
"use client";

import React from "react";
import clsx from "clsx";

interface BackgroundProps {
    children?: React.ReactNode;
    className?: string;
}

export default function Background({ children, className }: BackgroundProps) {
    return (
        <div
            className={clsx(
                " h-full w-full bg-[#0f172a] overflow-hidden",
                className
            )}
        >
            {/* Pattern Layer */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,#0f172a_1px)] bg-size-[20px_20px] mask-[radial-gradient(circle_80%_at_50%_50%,#000_70%,transparent_110%)] pointer-events-none"></div>

            {/* Optional content on top */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
