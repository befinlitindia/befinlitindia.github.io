import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    base: '/',
    plugins: [
      react(),
      Sitemap({ hostname: 'https://befinlit.in' }), // Replace with actual domain if known, or keeps as placeholder
      ViteImageOptimizer({
        /* pass your config */
      }),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace(/%VITE_GA_ID%/g, env.VITE_GA_ID || '');
        },
      },
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
