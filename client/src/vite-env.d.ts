/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** Base URL of the FlowFunds backend API. Required in production builds. */
    readonly VITE_API_URL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
