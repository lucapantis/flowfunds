import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  // Production must point at a real deployed API. Fail the build early instead
  // of shipping a bundle that falls back to http://localhost:3001.
  if (mode === "production" && !env.VITE_API_URL?.trim()) {
    throw new Error(
      "VITE_API_URL is required for production builds. Set it to the deployed API URL " +
        "(e.g. https://flowfunds-api.onrender.com) in your Vercel project settings.",
    );
  }

  return {
    plugins: [react(), tailwindcss()],
  };
});
