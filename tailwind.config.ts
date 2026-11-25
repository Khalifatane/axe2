import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: { extend: { height: { 120: '30rem' } } },
  plugins: [require('daisyui')],
  daisyui: {
    themes: false,
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: '',
    logs: false,
  },
};

export default config;
