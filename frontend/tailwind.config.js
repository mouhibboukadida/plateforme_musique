// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',     // Violet
        secondary: '#FF6B6B',   // Rouge/Orange
        accent: '#4ECDC4',      // Turquoise
        background: '#0A0A1A',  // Noir profond
      }
    },
  },
  plugins: [],
}