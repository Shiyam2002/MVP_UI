"use client";

import { useEffect } from "react";
import { getThemeFromCookie } from "@/src/lib/theme";
import { useThemeStore } from "../store/theme.store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const setTheme = useThemeStore((state) => state.setTheme);

    useEffect(() => {
        const theme = getThemeFromCookie() ?? "light";
        setTheme(theme);
    }, [setTheme]);

    return <>{children}</>;
}
