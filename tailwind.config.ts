// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      pretendard: ['Pretendard', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#4F46E5', 
      },
      screens: {
        'mobile-sm': '320px',
        xs: '480px',
      },
    },
  },
  plugins: [],
};

export default config;
