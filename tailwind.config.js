
// eslint-disable-next-line no-undef
const defaultTheme = require("tailwindcss/defaultTheme");

// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./packages/ui/**/*.{js,ts,jsx,tsx}",
    "./apps/front-end/market/pages/**/*.{js,ts,jsx,tsx}",
    "./apps/front-end/market/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        100: "repeat(100, minmax(0, 1fr))",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        sf: ["SF Pro Display", ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        height: "height",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "custum-aspect": "5 / 4",
      },
      colors: {
        iconGray: "#999999",
        primary: {
          DEFAULT: "#3AD398",
          hover: "#1d9266",
          light: "#ECFBF4",
          50: "#dffdf2",
          100: "#baf2dd",
          200: "#94e9c8",
          300: "#6bdeb3",
          400: "#43d59d",
          500: "#2abc83",
          600: "#1d9266",
          700: "#106848",
          800: "#02402b",
          900: "#00170c",
        },
        grayText: "#9A9A9A",
        title: "#000000cc",
        darkBrown: "#484848",
        PHText: "#626262",
        lightGray: "#F5F5F5",
        lightBlack: "#00000099",
        secondaryBlue: "#42ADE2",
        lightBlue: "#729FE5",
        secondaryRed: "#F67171",
        transparentBlue: "rgba(40,119,197,0.7)",
        // lightGray: "#F6F6F6",
        darkerGray: "#E8E8E8",
      },
      fontSize: {
        icon: "1.375rem",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("@tailwindcss/forms"),
    function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          "-ms-overflow-style": "none" /* Internet Explorer 10+ */,
          "scrollbar-width": "none" /* Firefox */,
          "&::-webkit-scrollbar": {
            display: "none" /* Safari and Chrome */,
          },
          overflow: "hidden" /* This ensures the scrollbar is hidden */,
        },
      });
    },
  ],
};
