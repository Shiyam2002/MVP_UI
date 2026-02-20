export const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ------------------------------------------------ */
/*                    API ERROR                     */
/* ------------------------------------------------ */

export class ApiError extends Error {
    public readonly status: number;
    public readonly data: unknown;

    constructor(status: number, message: string, data: unknown = null) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

/* ------------------------------------------------ */
/*                  REQUEST LAYER                   */
/* ------------------------------------------------ */

async function request<TResponse>(
    method: string,
    path: string,
    data?: unknown
): Promise<TResponse> {
    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers:
            data instanceof FormData
                ? undefined
                : { "Content-Type": "application/json" },
        body:
            data instanceof FormData
                ? data
                : data
                    ? JSON.stringify(data)
                    : undefined,
        cache: "no-store",
        credentials: "include",
    });

    let responseData: unknown = null;

    const contentType = res.headers.get("content-type");

    if (contentType?.includes("application/json")) {
        responseData = await res.json().catch(() => null);
    } else {
        responseData = await res.text().catch(() => null);
    }

    if (!res.ok) {
        throw new ApiError(
            res.status,
            typeof responseData === "string"
                ? responseData
                : "Request failed",
            responseData
        );
    }

    if (res.status === 204) {
        return null as TResponse;
    }

    return responseData as TResponse;
}

/* ------------------------------------------------ */
/*               PUBLIC API METHODS                 */
/* ------------------------------------------------ */

export const apiGet = <TResponse>(path: string) =>
    request<TResponse>("GET", path);

export const apiPost = <TResponse, TBody = unknown>(
    path: string,
    data: TBody
) => request<TResponse>("POST", path, data);

export const apiPut = <TResponse, TBody = unknown>(
    path: string,
    data: TBody
) => request<TResponse>("PUT", path, data);

export const apiDelete = <TResponse>(path: string) =>
    request<TResponse>("DELETE", path);
