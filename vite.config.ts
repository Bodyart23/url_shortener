import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const cleanUriProxy = {
  target: 'https://cleanuri.com',
  changeOrigin: true,
  rewrite: () => '/api/v1/shorten',
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/shorten': cleanUriProxy,
    },
  },
  preview: {
    proxy: {
      '/api/shorten': cleanUriProxy,
    },
  },
});
