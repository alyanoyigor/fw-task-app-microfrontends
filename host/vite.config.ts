import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_BASE_URL, VITE_LIST_URL, VITE_EDITOR_URL, VITE_AUTH_URL } = loadEnv(
    mode,
    process.cwd()
  );

  return {
    base: VITE_BASE_URL,
    plugins: [
      react(),
      TanStackRouterVite(),
      federation({
        name: 'host',
        remotes: {
          'task-list': `${VITE_LIST_URL}/assets/taskListRemoteEntry.js`,
          'task-editor':
            `${VITE_EDITOR_URL}/assets/taskEditorRemoteEntry.js`,
          auth: `${VITE_AUTH_URL}/assets/authRemoteEntry.js`,
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
