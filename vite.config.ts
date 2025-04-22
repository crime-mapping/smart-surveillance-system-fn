import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : 5000,
  },
  preview: {
    port: process.env.PORT ? Number(process.env.PORT) : 5000,
    host: true,
  },
});
