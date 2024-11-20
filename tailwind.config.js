/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust paths based on your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        'dark-navy': '#000e23',
        'deep-teal': '#213951',
        'forest-green': '#3a6667',
        'jade': '#497d67',
        'golden': '#cc9900',
        'aqua': '#00c3b5',
        'misty-blue': '#b6c1d3',
        'cream': '#f6e5af',
      },
    },
  },
  plugins: [],
};
