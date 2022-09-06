module.exports = {
  content: [
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "custum-aspect": "5 / 4",
      },
      colors: {
        PHText: "#626262",
        lightGray: "#F5F5F5",
        lightBlack: "#00000099",
        secondaryBlue: "#42ADE2",
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
        lightBlue: "#729FE5",
        secondaryRed: "#F67171",
        transparentBlue: "rgba(40,119,197,0.7)",
        lightGray: "#F6F6F6",
        darkerGray: "#E8E8E8",
      },
      fontSize: {
        icon: "1.375rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
