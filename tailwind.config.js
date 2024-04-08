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
        darkPurple: '#141625',
        brightPurple: '#7C5DFA',
        grayPurple: '#888EB0',
        boldGrayPurple: '#777F98',
        borderPurple: '#252945',
        detailPurple: '#7E88C3',
        paid: '#33D69F',
        bgPaid: 'rgba(51, 214, 159, 0.06)',
        bgPaidLight: 'rgba(51, 214, 159, 0.09)',
        pending: '#FF8F00',
        bgPending: 'rgba(255, 143, 0, 0.06)',
        draft: '#DFE3FA',
        draftLight: '#373B53',
        bgDraft: 'rgba(223, 227, 250, 0.06)',
        bgDraftLight: 'rgba(55, 59, 83, 0.06)',
        draftBtn: '#373B53',
        deleteBtn: '#EC5757',
        hoverPurple: '#9277FF',
        hoverRed: '#FF9797',
        hoverGrayPurple: '#1E2139',
        lightBg: '#F2F2F2',
        lightText: '#0C0E16',
        lilacPurple: '#DFE3FA',
        grayerPurple: '#858BB2',
        grey: '#F9FAFE',
      },
      backgroundImage: {
        nav: "url('/assets/nav.svg')",
      },
      fontFamily: {
        spartan: ['League Spartan'],
        home: ['Josefin Sans'],
      },
    },
  },
  plugins: [],
};
