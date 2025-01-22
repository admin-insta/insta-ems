/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all JS/JSX/TS/TSX files in the src folder
    "./public/index.html", // Optionally, include the HTML file
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          DEFAULT: '#d1cbc1', // Example clay color
          light: '#f6f3e1',   // Lighter shade
          dark: '#8A4C38',    // Darker shade
        },
        future : "#eeeeee"
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'], // Add Poppins font
      nunito: ['"Nunito Sans"', 'sans-serif'],
    },
  },
  plugins: [],
};
