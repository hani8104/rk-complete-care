import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/rk-complete-care/",
  server: {
    proxy: {
      '/api': {
        target: 'https://rk-complete-care-backend.onrender.com',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'https://rk-complete-care-backend.onrender.com',
        changeOrigin: true,
      }
    }
  }
})