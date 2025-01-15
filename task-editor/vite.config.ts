import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_BASE_URL } = loadEnv(mode, process.cwd());

  return {
    base: VITE_BASE_URL,
    plugins: [
      react(),
      federation({
        name: 'task-editor',
        filename: 'taskEditorRemoteEntry.js',
        exposes: {
          './index': './src/App.tsx',
        },
        shared: ['react', 'react-dom'],
      }),
    ],
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
