/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import visualizer from 'rollup-plugin-visualizer'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'packages'),
    },
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    lib: {
      entry: {
        'core/index': path.resolve(__dirname, 'packages/core/index.ts'),
        'operator/index': path.resolve(__dirname, 'packages/operator/index.ts'),
        'decorator/index': path.resolve(__dirname, 'packages/decorator/index.ts'),
        'helper/index': path.resolve(__dirname, 'packages/helper/index.ts'),
      },
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-redux',
        'reflect-metadata',
        'rxjs',
        'redux',
        'redux-observable-action',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          rxjs: 'rxjs',
        },
      },
      plugins: [
        visualizer({
          open: false,
          gzipSize: true,
          brotliSize: true,
        }),
      ],
    },
  },
  test: {
    environment: 'jsdom',
  },
})
