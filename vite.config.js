/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import visualizer from 'rollup-plugin-visualizer'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/core/index.ts'),
        helper: path.resolve(__dirname, 'src/helper/index.ts'),
        decorator: path.resolve(__dirname, 'src/decorator/index.ts'),
        operator: path.resolve(__dirname, 'src/operator/index.ts'),
        react: path.resolve(__dirname, 'src/react/index.ts'),
        vue: path.resolve(__dirname, 'src/vue/index.ts'),
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
        'vue',
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
