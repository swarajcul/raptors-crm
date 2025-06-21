/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode using a class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-950': '#1e002d', // Example hex, replace with actual if available
        'purple-800': '#3c005a', // Example hex, replace with actual if available
        'orange-600': '#ff6600', // Example hex, replace with actual if available
        'orange-500': '#ff8533', // Example hex, replace with actual if available
        'slate-50':   '#f8fafc', // Standard Tailwind slate-50
        // white is already available as 'white'
      }
    },
  },
  plugins: [],
}
