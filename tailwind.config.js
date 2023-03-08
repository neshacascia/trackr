/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mainPurple: '#1E2139',
        lightPurple: '#494E6E',
      },
      backgroundImage: {
        nav: "url('/assets/nav.svg')",
      },
      fontFamily: {
        spartan: ['League Spartan'],
      },
    },
  },
  plugins: [],
};
