const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    // classes that are generated dynamically, e.g. `rounded-${size}` and must
    // be kept
    safeList: [],
    content: ['./index.html', './src/**/*.{js,ts,tsx,jsx}'],
  },
  theme: {
    extend: {},
  },
};
