module.exports = {
  darkMode: "class", // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {
      colors: {
        copper: "#B36D30",
        "totem-pole": "#982B07",
        cameo: "#CA9D79",
        "golden-sand": "#F4CD84",
        rebel: "#370B06",
        silk: "#C2A8A8",
        white: "#f7f7f7",
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
  plugins: [require("@tailwindcss/typography")()],
};
