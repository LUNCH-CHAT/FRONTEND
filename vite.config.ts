/* eslint-disable no-undef */
/* eslint-env node */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isAnalyze = process.env.ANALYZE === 'true';

  return {
    plugins: [
      react(),
      tailwindcss(),
      svgr(),
      ...(isAnalyze
        ? [
            visualizer({
              filename: 'stats.html',
              open: true,
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ],
    define: { global: 'window' },
    resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
    server: {
      proxy: {
        '^/api/.*': {
          target: env['VITE_API_URL'],
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      cssCodeSplit: true,
      sourcemap: false,
      // 🟡 경고만 숨기고 싶으면 수치만 올려도 됨
      chunkSizeWarningLimit: 1200, // kB
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (id.includes('react-router-dom') || id.includes('/react/')) return 'react';
            if (id.includes('@tanstack/react-query')) return 'query';
            if (id.includes('swiper')) return 'swiper';
            if (id.includes('react-toastify')) return 'toastify';
            if (id.includes('@stomp/stompjs')) return 'stomp';
            if (id.includes('firebase')) return 'firebase';
            if (id.includes('@headlessui') || id.includes('@floating-ui')) return 'headlessui';
            return 'vendor';
          },
        },
      },
    },
  };
});
