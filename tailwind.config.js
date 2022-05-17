module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#EAE7F4",
          200: "#D2CBE7",
          300: "#BDB2DB",
          400: "#A89AD0",
          500: "#9180C4",
          600: "#6B54B0",
          700: "#4F3D84",
          800: "#342857",
          900: "#1B152D",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
