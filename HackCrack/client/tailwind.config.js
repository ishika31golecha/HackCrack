/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {backgroundImage: {
      homebg: "url('/Home_bg.jpg')", 
      homebg2: "url('/Home_bg2.jpg')",
     },},
  },
  plugins: [],
}

