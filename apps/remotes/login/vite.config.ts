import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "login",
      filename: "remoteEntry.js",
      exposes: {
        './Login': './src/App.tsx',
      },
      shared: {
        react: {
          requiredVersion: "^18.3.1",
          singleton: true,
        },
      },
    })
  ],
})
