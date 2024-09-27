/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'observable-duck/core',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-redux', 'reflect-metadata', 'rxjs', 'redux', 'observable-duck/decorator', 'observable-duck/decorator/src/internal'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          rxjs: 'rxjs',
        },
      },
    },
  },
})
