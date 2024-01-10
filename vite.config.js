import path from 'path'
import { defineConfig } from 'vite'
import visualizer from 'rollup-plugin-visualizer'

export default defineConfig({
  build: {
    outDir: "build",
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'observable-duck',
      fileName: 'observable-duck',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'rxjs', 'redux', 'redux-observable-action'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          rxjs: 'rxjs',
        },
      },
      plugins: [
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
      ]
    },
  },
})