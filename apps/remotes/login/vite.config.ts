import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    server: {
      host: '0.0.0.0',
      port: 5500,
    },
    preview: {
      host: '0.0.0.0',
    },
    build: {
      target: 'chrome89',
    },
    plugins: [
      federation({
        filename: 'remoteEntry.js',
        name: "@remote/login",
        exposes: {
          '.': './src/App.tsx',
          './CardDemo': './src/CardDemo.tsx',
        },
        remotes: {},
        manifest: true,
        shared: {
          react: {
            requiredVersion: "^18.3.1",
            singleton: true,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: "^18.3.1",
          },
        },
      }),
      react(),
    ],
  }
})
