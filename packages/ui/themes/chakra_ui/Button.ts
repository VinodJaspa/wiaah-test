import { ComponentStyleConfig } from "@chakra-ui/react";

export default {
  baseStyle: {
    _focus: { ring: "0px" },
  },
  variants: {
    solid: {
      bgColor: "primary.main",
      color: "white",
    },
    outline: {
      color: "black",
      borderWidth: "0.125rem",
      borderColor: "primary.main",
    },
    noBg: {
      backgroundColor: "transperant",
    },
  },
  defaultProps: {
    variant: "solid",
    colorScheme: "primary",
  },
} as ComponentStyleConfig;
