import React from "react";

export const useResponsive = () => {
  const [screenWidth, setScreenWidth] = React.useState<number>(0);

  function HandleScreenSize(e: UIEvent) {
    if (window) {
      setScreenWidth(window.innerWidth);
    }
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", HandleScreenSize);
    }
    return () => {
      window.removeEventListener("resize", HandleScreenSize);
    };
  }, []);

  const isMobile = screenWidth < 480;
  const isTablet = screenWidth < 1024;

  return {
    isMobile,
    isTablet,
  };
};
