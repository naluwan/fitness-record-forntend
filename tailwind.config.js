/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        typing: 'typing 5s infinite steps(34)',
      },
      keyframes: {
        typing: {
          '0%': {
            width: '0',
          },
          '80%': {
            width: '34ch',
          },
          '100%': {
            width: '34ch',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
};
