export type Theme = "light" | "dark";

const THEME_COOKIE = "app-theme";

export function getThemeFromCookie(): Theme | null {
    if (typeof document === "undefined") return null;

    const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${THEME_COOKIE}=`));

    return match ? (match.split("=")[1] as Theme) : null;
}