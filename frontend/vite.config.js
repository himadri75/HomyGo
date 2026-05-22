import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // important for external access (binds to 0.0.0.0)
    port: 3000,
    allowedHosts: ['api2.apps24.tech']
  }
})