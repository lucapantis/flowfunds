// Centralized API configuration.
//
// The base URL of the FlowFunds backend API is read from the Vite environment
// variable `VITE_API_URL`.
//
// - Development: if `VITE_API_URL` is not set, we fall back to the local backend
//   at http://localhost:3001.
// - Production: `VITE_API_URL` is required. A production build/run without a
//   valid URL fails fast instead of silently calling localhost.

const DEV_FALLBACK_API_URL = "http://localhost:3001";

function resolveApiBaseUrl(): string {
    const configured = import.meta.env.VITE_API_URL?.trim();

    if (configured) {
        const normalized = configured.replace(/\/+$/, "");

        try {
            // Throws if the value is not a valid absolute URL.
            new URL(normalized);
        } catch {
            throw new Error(
                `VITE_API_URL is not a valid URL: "${configured}". ` +
                    "Set it to the full origin of the deployed API, e.g. https://flowfunds-api.onrender.com",
            );
        }

        return normalized;
    }

    if (import.meta.env.PROD) {
        throw new Error(
            "VITE_API_URL is not set. Production builds must define VITE_API_URL " +
                "with the URL of the deployed FlowFunds API (e.g. https://flowfunds-api.onrender.com).",
        );
    }

    return DEV_FALLBACK_API_URL;
}

export const API_BASE_URL = resolveApiBaseUrl();

/**
 * Build a full API URL from a path.
 *
 * @example apiUrl("/api/transactions") -> "http://localhost:3001/api/transactions"
 */
export function apiUrl(path: string): string {
    return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
