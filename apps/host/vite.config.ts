import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        '@remote-login': {
          type: "module",
          name: "@remote-login",
          entry: "http://192.168.58.59:3001/remoteEntry.js",
        },
      },
      dev: true,
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
    })
  ],
  build: {
    target: 'chrome89',
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  }
})
