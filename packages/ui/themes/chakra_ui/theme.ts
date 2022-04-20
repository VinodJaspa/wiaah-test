import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";
import Button from "./Button";
import Avatar from "./Avatar";

const theme = extendTheme({
  colors: {
    primary: {
      main: "#3AD398",
      hover: "#6bdeb3",
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
  },
  shadows: {
    main: "0px 3px 15px -5px gray",
  },
  components: {
    Avatar,
    Button,
  },
});

export default theme;
