import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path: /CookSmart/ for GitHub Pages CI, / for Vercel & local dev
const base = process.env.GITHUB_ACTIONS ? '/CookSmart/' : '/'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
})
