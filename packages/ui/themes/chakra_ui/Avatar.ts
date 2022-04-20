import { ComponentStyleConfig } from "@chakra-ui/react";

export default {
  baseStyle: {
    backgroundColor: "#000",
    img: {
      height: "auto",
      width: "100%",
    },
  },
  variants: {
    main: {
      bgColor: "#000",
    },
  },
  defaultProps: {
    variant: "main",
  },
} as ComponentStyleConfig;
