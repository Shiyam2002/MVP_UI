export const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
}

async function request(method: string, path: string, data: unknown = null) {
    const token = getToken();

    const headers: Record<string, string> = {
        ...(data instanceof FormData ? {} : { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    const options: RequestInit = {
        method,
        headers,
        cache: "no-store",
    };

    if (data) {
        options.body =
            data instanceof FormData ? data : JSON.stringify(data);
    }

    const res = await fetch(`${API_URL}${path}`, options);

    if (!res.ok) {
        let err = "API Error";
        try {
            const json = await res.json();
            err = json.message || err;
        } catch { }
        throw new Error(err);
    }

    if (res.status === 204) return null;

    try {
        return await res.json();
    } catch {
        return null;
    }
}

export const apiGet = (path: string) => request("GET", path);
export const apiPost = (path: string, data: unknown) => request("POST", path, data);
export const apiPut = (path: string, data: unknown) => request("PUT", path, data);
export const apiDelete = (path: string) => request("DELETE", path);