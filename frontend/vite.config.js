import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // important for external access (binds to 0.0.0.0)
    port: 5173,
    allowedHosts: ['api3.apps24.tech', "deliverer-premiere-gander.ngrok-free.dev"]
  }
})