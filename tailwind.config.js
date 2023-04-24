/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-sadient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      translate: {
        center: '-50%',
      },
    },
  },
  plugins: [],
};
