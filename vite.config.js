import path from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  root: `${__dirname}/example`,
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, './'),
      '@/core': path.resolve(__dirname, 'lib/core'),
      '@/middleware': path.resolve(__dirname, 'lib/middleware'),
      '@/decorator': path.resolve(__dirname, 'lib/decorator'),
      '@/operator': path.resolve(__dirname, 'lib/operator'),
    },
  },
  plugins: [
    splitVendorChunkPlugin(),
    react(),
  ]
})