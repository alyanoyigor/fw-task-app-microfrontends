import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const { VITE_BASE_URL } = loadEnv(mode, process.cwd());

  return {
    base: VITE_BASE_URL,
    plugins: [
      react(),
      federation({
        name: 'task-list',
        filename: 'taskListRemoteEntry.js',
        exposes: {
          './index': './src/App.tsx',
        },
        shared: ['react', 'react-dom'],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
  };
});
