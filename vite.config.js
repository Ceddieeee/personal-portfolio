import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { portfolio } from './src/content.js';
import { loadingScreenPlugin } from './src/loading-screen.js';

export default defineConfig({
  base: './',
  esbuild: { jsx: 'automatic' },
  plugins: [tailwindcss(), loadingScreenPlugin(portfolio.profile.name)],
  build: {
    rollupOptions: {
      input: {
        portfolio: fileURLToPath(new URL('./index.html', import.meta.url)),
        charcoal: fileURLToPath(new URL('./charcoal.html', import.meta.url)),
      },
    },
  },
});
