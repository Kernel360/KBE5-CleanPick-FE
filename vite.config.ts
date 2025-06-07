import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    host: '0.0.0.0', // ← 핵심
    port: 5137,
    allowedHosts: ['72c4-27-35-73-73.ngrok-free.app'],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})

