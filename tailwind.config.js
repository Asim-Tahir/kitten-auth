module.exports = {
  darkMode: "class", // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F8F9FA",
          200: "#DEE2E6",
          300: "#CED4DA",
          400: "#ADB5BD",
          500: "#6C757D",
          600: "#495057",
          700: "#343A40",
          800: "#212529",
          900: "#16191B",
        },
        white: "#f7f7f7",
        black: "#1D1D1B",
      },
      screens: {
        xs: "480px",
      },
    },
    fontFamily: {
      sans: ["Raleway", "sans-serif"],
      brand: ["Clicker Script", "cursive"],
    },
  },
  plugins: [require("@tailwindcss/typography")()],
};
