/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'off-white-light': '#fffcf2',
        'blue': '#00003c',
        'blue-light': '#64648C',
        'beige': '#f7f0dc',
        'teal': '#1ed2af',
        'red': '#d00414',
        'light-beige': '#f7ede8',
        'white': 'white',
        'offwhite': '#fef9e6'
      }
    },
  },
  plugins: [],
}

