import React from "react";

export const useResponsive = () => {
  const [screenWidth, setScreenWidth] = React.useState<number>(0);

  function HandleScreenSize() {
    if (window) {
      setScreenWidth(window.innerWidth);
    }
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", HandleScreenSize);
      document.addEventListener("resize", HandleScreenSize);
      document.addEventListener("load", HandleScreenSize);
    }
    return () => {
      window.removeEventListener("resize", HandleScreenSize);
      document.removeEventListener("resize", HandleScreenSize);
      document.removeEventListener("load", HandleScreenSize);
    };
  }, []);

  const isMobile = screenWidth < 480;
  const isTablet = screenWidth < 1024;

  return {
    isMobile,
    isTablet,
  };
};
