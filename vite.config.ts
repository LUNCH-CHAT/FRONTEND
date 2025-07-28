// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

 
  server: {
    proxy: {
      
      '^/api/.*': {
        target: 'https://lunchchat.kro.kr',
        changeOrigin: true,
        secure: false,
      },
    },
  },
 
});
