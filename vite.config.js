import path from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  resolve: {
    alias: {
      '@/core': path.resolve(__dirname, 'lib/core'),
      '@/middleware': path.resolve(__dirname, 'lib/middleware'),
      '@/decorator': path.resolve(__dirname, 'lib/decorator'),
      '@/operator': path.resolve(__dirname, 'lib/operator'),
      '@/duck': path.resolve(__dirname, 'lib/duck'),
    },
  },
  plugins: [
    splitVendorChunkPlugin(),
    react(),
  ]
})