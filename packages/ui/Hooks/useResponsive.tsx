import { useBreakpointValue } from "@chakra-ui/react";

export const useResponsive = () => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const isTablet = useBreakpointValue({ base: true, lg: false });

  return {
    isMobile,
    isTablet,
  };
};
