import path from 'path'
import { defineConfig } from 'vite'
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
  plugins: [react()],
  build: {
    outDir: "build",
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'observable-duck',
      fileName: 'observable-duck',
    }
  }
})