import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
export default defineConfig(function () { return ({
    plugins: [
        react(),
        tsConfigPaths(),
        dts({
            include: ['src/module'],
            rollupTypes: true,
            exclude: [
                '**/__tests__/**',
                '**/*.{test,stories}.{js,ts,jsx,tsx}'
            ],
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
            entry: resolve(__dirname, 'src/module/main.ts'),
            name: 'MyLib',
            fileName: function (format) { return "index.".concat(format === "es" ? "mjs" : "cjs"); },
        },
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/module/main.ts'),
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
}); });
