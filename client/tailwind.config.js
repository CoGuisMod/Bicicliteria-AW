module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "clr-primary-one": "#2b2d42",
        "clr-primary-two": "#8d99ae",
        "clr-secondary-one": "#edf2f4",
        "clr-thertiary-one": "#ef233c",
        "clr-tertiary-two": "#d90429",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
