/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#F4025D", // Yellow
          secondary: "#FAD93D", // Orange
          tertiary: "#A6702E", // Dark green/brown
          neutral: "#BFB6AE", // Gray
          light: "#F2F2F2", // Light gray
        },
      },
    },
  },
  plugins: [],
};
