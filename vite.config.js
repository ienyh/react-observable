import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, 'core'),
      '@decorator': path.resolve(__dirname, 'decorator'),
      '@operator': path.resolve(__dirname, 'operator'),
      '@duck': path.resolve(__dirname, 'duck'),
    },
  },
  plugins: [react()],
  build: {
    outDir: "build",
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'observable-duck',
      fileName: 'observable-duck',
    }
  }
})