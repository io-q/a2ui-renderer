import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/a2ui-renderer/',  // GitHub Pages base path (repo name)
  resolve: {
    dedupe: ['react', 'react-dom'],  // Prevent duplicate React instances
    alias: {
      // Force all packages to use the same React instance from demo's node_modules
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
})
