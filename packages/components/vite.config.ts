import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => ({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ['lib'],
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        main: resolve(__dirname, 'lib/main.ts')
      },
      name: 'MyLib',
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'lib/main.ts'),
      },
      external: ["react", "react-dom", 'react/jsx-runtime'],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      }
    },
    emptyOutDir: true,
  },
}))