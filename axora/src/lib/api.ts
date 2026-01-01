
export const API_URL = process.env.NEXT_PUBLIC_API_URL;


async function request(method: string, path: string, data: unknown = null) {
    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers: data instanceof FormData
            ? {}
            : { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : undefined,
        cache: "no-store",
        credentials: "include", // 🔥 REQUIRED
    });

    if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        if (res.status === 403) throw new Error("Forbidden");
        throw new Error(await res.text());
    }

    if (res.status === 204) return null;
    return res.json();
}



export const apiGet = (path: string) => request("GET", path);
export const apiPost = (path: string, data: unknown) => request("POST", path, data);
export const apiPut = (path: string, data: unknown) => request("PUT", path, data);
export const apiDelete = (path: string) => request("DELETE", path);