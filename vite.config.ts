import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : 5000,
  },
  preview: {
    port: process.env.PORT ? Number(process.env.PORT) : 5000,
    host: true,
  },
});
