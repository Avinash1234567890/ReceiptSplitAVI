/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: 'var(--orange)',
        lime: 'var(--lime)',
        blue: 'var(--blue)',
        magenta: 'var(--magenta)',
        black: 'var(--black)',
        white: 'var(--white)',
      },
    },
  },
  plugins: [],
};
