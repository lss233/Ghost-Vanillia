module.exports = {
  purge: {
    content: [
      './assets/js/*.js',
      './*.hbs',
      './partials/*.hbs',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    nightwind: {
      typography: true,
      transitionDuration: "500ms",
    },
    extend: {},
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("nightwind")
    // ...
  ],
}
