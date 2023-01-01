import { ChakraProvider } from "@chakra-ui/react";
import theme from "@UI/themes/chakra_ui/theme";

export default (Story: any) => (
  <ChakraProvider theme={theme}>
    <Story />
  </ChakraProvider>
);
