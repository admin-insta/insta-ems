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
          DEFAULT: '#d7d5c7', // Example clay color
          light: '#D7A18B',   // Lighter shade
          dark: '#8A4C38',    // Darker shade
        },
      }
    },
  },
  plugins: [],
};
