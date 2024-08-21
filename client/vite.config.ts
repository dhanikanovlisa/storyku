import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, './src/assets'),
      "@components": path.resolve(__dirname, './src/components'),
      "@lib": path.resolve(__dirname, './src/lib'),
      "@pages": path.resolve(__dirname, './src/pages'),
      "@services": path.resolve(__dirname, './src/services'),
      "@styles": path.resolve(__dirname, './src/styles'),
      "@utils": path.resolve(__dirname, './src/utils'),
    },
  },
})
