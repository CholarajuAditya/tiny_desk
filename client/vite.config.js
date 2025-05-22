import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    server: {
        proxy: {
            "/api": {
                target: "https://tiny-desk.onrender.com",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    plugins: [react(), tailwindcss()],
});
