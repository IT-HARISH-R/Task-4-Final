/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [],
}

// npx tailwindcss -i ./src/styles.css -o ./dist/styles.css --watch