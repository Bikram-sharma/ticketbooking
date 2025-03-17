import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

  plugins: [react()],
  server: {
    // Configure proper MIME types
    headers: {
      'Content-Type': 'application/javascript'
    },
    // Allow serving files from one level up to the project root if needed
    fs: {
      allow: ['..']
    }
  }
})



