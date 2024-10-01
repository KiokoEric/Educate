/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Green: '#259F6C',
        Blue: '#1E6B7F',
        DarkBlue: '#1F4068'
      },
    },
  },
  plugins: [],
}