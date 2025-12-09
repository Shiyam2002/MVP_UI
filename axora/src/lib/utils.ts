// -----------------------------
// Debounce Function
// -----------------------------
export function debounce<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay = 300
) {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

// -----------------------------
// Format Date (Safe)
// -----------------------------
export function formatDate(
    input: string | number | Date,
    locale: string = "en-IN"
): string {
    try {
        const date = new Date(input);
        if (isNaN(date.getTime())) return "";
        return date.toLocaleDateString(locale, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    } catch {
        return "";
    }
}

// -----------------------------
// Sleep Utility
// -----------------------------
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// -----------------------------
// Generate Random ID (UUID v4)
// -----------------------------
export function generateId(): string {
    return crypto.randomUUID();
}

// -----------------------------
// Safe JSON Parse
// -----------------------------
export function safeJsonParse<T>(value: string): T | null {
    try {
        return JSON.parse(value) as T;
    } catch {
        return null;
    }
}

// -----------------------------
// Check if value is empty
// -----------------------------
export function isEmpty(value: unknown): boolean {
    if (value == null) return true;
    if (typeof value === "string" && value.trim() === "") return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === "object" && Object.keys(value).length === 0) return true;
    return false;
}

// -----------------------------
// Capitalize First Letter
// -----------------------------
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
