import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      pretendard: ['Pretendard', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};

export default config;
