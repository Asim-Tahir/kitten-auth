module.exports = {
  darkMode: "class", // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {
      colors: {
        purple: "#8C00B8",
        "navy-blue": "#1D0CFF",
        violet: "#5406DB",
        // primary: {
        //   lighter: "#6459FF",
        //   DEFAULT: "#1d0cff",
        //   dark: "#4208e7",
        // },
        // secondary: {
        //   lighter: "#8B45D7",
        //   light: "#9e0feb",
        //   DEFAULT: "#6704cf",
        //   dark: "#33194F",
        // },
        white: "#fcfcfc",
        black: "#1D1D1B",
      },
      screens: {
        xs: "480px",
      },
    },
    fontFamily: {
      sans: ["Raleway", "system-ui", "sans-serif"],
    },
  },
};
