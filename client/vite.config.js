import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({ 
  server: {
    proxy: {
      "/api": {  // ✅ Proxy only API requests
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes "/api" prefix
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
