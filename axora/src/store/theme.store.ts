import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: "light",
    setTheme: (theme) => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        document.cookie = `app-theme=${theme}; path=/; max-age=31536000`;
        set({ theme });
    },
}));
