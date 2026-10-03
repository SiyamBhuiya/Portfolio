import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Makes dist/index.html work when you double-click it (file://), as well as on any web host.
// Browsers block type="module" scripts and crossorigin assets on file://, which gave a blank white page.
const fileFriendly = () => ({
  name: 'file-friendly',
  enforce: 'post',
  transformIndexHtml(html) {
    return html
      .replace('<script type="module" crossorigin', '<script defer')
      .replace('<link rel="stylesheet" crossorigin', '<link rel="stylesheet"')
  },
})

export default defineConfig({
  base: './',
  plugins: [react(), fileFriendly()],
  build: { rollupOptions: { output: { format: 'iife', inlineDynamicImports: true } } },
})
