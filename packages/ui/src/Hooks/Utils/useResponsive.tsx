import { useState, useEffect } from "react";

export const useResponsive = (
  mobileBreakpoint: number = 768,
  tabletBreakpoint: number = 1024,
) => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth <= mobileBreakpoint,
  );
  const [isTablet, setIsTablet] = useState<boolean>(
    window.innerWidth > mobileBreakpoint &&
    window.innerWidth <= tabletBreakpoint,
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsMobile(width <= mobileBreakpoint);
      setIsTablet(width > mobileBreakpoint && width <= tabletBreakpoint);
    };

    window.addEventListener("resize", handleResize);

    // Initial check on mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileBreakpoint, tabletBreakpoint]);

  return {
    isMobile,
    isTablet,
    screenWidth,
  };
};
