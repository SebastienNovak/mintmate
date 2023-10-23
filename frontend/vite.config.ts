import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      // Add any path aliases if needed
    }
  },

  css: {
    // CSS configuration options
  },

  build: {
    // Build-specific options
  },

  server: {
    // Development server options
  }
})
