import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load environment variables from .env
dotenv.config()

export default defineConfig({
  plugins: [react()],
  base: '/asteroid-watch/', 
  define: {
    'process.env.VITE_NASA_API_KEY': JSON.stringify(process.env.VITE_NASA_API_KEY),
  },
});
