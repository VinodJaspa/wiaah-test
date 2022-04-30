import { useBreakpointValue } from "@chakra-ui/react";

export const useResponsive = () => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const isTablet = useBreakpointValue({ md: true, lg: false });

  return {
    isMobile,
    isTablet,
  };
};
