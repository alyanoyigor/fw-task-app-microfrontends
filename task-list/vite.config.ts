import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
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
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
