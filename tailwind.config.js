module.exports = {
  purge: {
    enabled: true,
    content: [
      './assets/js/*.js',
      './*.hbs',
      './partials/*.hbs',
    ]
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
