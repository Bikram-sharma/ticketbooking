/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sevillana: ['Sevillana', 'cursive'], // Add the new font
      },
      width: {
        a4: '49.625rem', // A4 width in rem
      },
      height: {
        a4: '70.1875rem', // A4 height in rem
      },
    },
  },
  plugins: [],
}

