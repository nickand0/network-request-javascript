/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './public/javascripts/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans','sans-serif'],
    },
    },
  plugins: [],
}
}
