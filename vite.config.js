import { defineConfig } from 'vite'

import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      tsConfigFilePath: 'tsconfig.json',
      outputDir: 'dist/types',
      include: ['src/**/*.ts'],
    }),
  ],
    build: {
      lib: {
        entry:  path.resolve(__dirname, 'src/index.ts'),
        name: 'joegreenservicelibrary',
        formats: ['es', 'umd', 'cjs'],
        fileName: (format) => `index.${format}.js`
      },
      rollupOptions: {
        // Ensure to externalize dependencies that shouldn't be bundled into your library
        external: ['axios'],
        output: {
          globals: {
            axios: 'axios'
          }
        }
      }
    }
  })
  