import { getCookie } from "./cookies";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
    if (typeof window === "undefined") return null;
    return getCookie("token");
}

async function request(method: string, path: string, data: unknown = null) {
    const token = getToken();

    const headers: Record<string, string> = {
        ...(data instanceof FormData ? {} : { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        cache: "no-store",
        credentials: "include",
    });

    if (!res.ok) {
        if (res.status === 401) {
            throw new Error("Invalid email or password");
        }

        if (res.status === 403) {
            throw new Error("Access denied");
        }

        let message = "Something went wrong";
        try {
            const text = await res.text();
            if (text) message = text;
        } catch { }

        throw new Error(message);
    }

    if (res.status === 204) return null;
    return res.json();
}


export const apiGet = (path: string) => request("GET", path);
export const apiPost = (path: string, data: unknown) => request("POST", path, data);
export const apiPut = (path: string, data: unknown) => request("PUT", path, data);
export const apiDelete = (path: string) => request("DELETE", path);