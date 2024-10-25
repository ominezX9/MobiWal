/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#525298',
        secondary: '#9471F6',
        info: '#32A7E2',
        orange: '#FF8700',
        green: '#22B07D',
        gray: '#979797',
        smoke: '#E5E5E5',
        fume: "#F3F3F8",
        gold: '#FFBF47',
      },
    },
  },
  plugins: [],
}