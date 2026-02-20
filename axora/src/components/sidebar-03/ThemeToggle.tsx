"use client";

import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/src/store/theme.store";
import { cn } from "@/src/lib/utils";

export function ThemeToggle() {
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);

    return (
        <div className="inline-flex w-full rounded-lg bg-muted p-1">
            <button
                onClick={() => setTheme("light")}
                className={cn(
                    "flex items-center justify-center gap-1.5 flex-1 px-2 py-1 text-xs rounded-md transition-all duration-200",
                    theme === "light"
                        ? "bg-background text-foreground shadow-sm font-medium"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                <Sun className="size-3" />
                Light
            </button>

            <button
                onClick={() => setTheme("dark")}
                className={cn(
                    "flex items-center justify-center gap-1.5 flex-1 px-2 py-1 text-xs rounded-md transition-all duration-200",
                    theme === "dark"
                        ? "bg-background text-foreground shadow-sm font-medium"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                <Moon className="size-3" />
                Dark
            </button>
        </div>
    );
}
