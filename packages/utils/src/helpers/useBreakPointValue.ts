import { useMediaQuery } from "react-responsive";

export const useBreakpointValue = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });
  const isMediumScreen = useMediaQuery({ maxWidth: 1024 });

  return isSmallScreen ? "base" : isMediumScreen ? "md" : "lg";
};
