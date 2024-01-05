import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [react()],
  build: {
    outDir: "build",
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'observable-duck',
      fileName: 'observable-duck',
    }
  }
})