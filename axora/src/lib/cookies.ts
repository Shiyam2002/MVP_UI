export function setCookie(name: string, value: string, days: number = 7) {
    if (typeof window === "undefined") return;

    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

export function getCookie(name: string) {
    if (typeof window === "undefined") return null;

    return document.cookie
        .split("; ")
        .find(row => row.startsWith(name + "="))
        ?.split("=")[1];
}

export function deleteCookie(name: string) {
    if (typeof window === "undefined") return;

    document.cookie = `${name}=; Max-Age=0; path=/`;
}
