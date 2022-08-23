import React from "react";

export const useResponsive = () => {
  const [screenWidth, setScreenWidth] = React.useState<number>(0);

  function HandleScreenSize() {
    if (
      typeof window !== "undefined" &&
      typeof window.innerWidth !== "undefined"
    ) {
      setScreenWidth(window.innerWidth);
    }
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", HandleScreenSize);
      window.addEventListener("load", HandleScreenSize);
      window.addEventListener("DOMContentLoaded", HandleScreenSize);
    }
    HandleScreenSize();
    return () => {
      window.removeEventListener("resize", HandleScreenSize);
      window.removeEventListener("load", HandleScreenSize);
      window.removeEventListener("DOMContentLoaded", HandleScreenSize);
    };
  }, [typeof window]);

  const isMobile = screenWidth < 640;
  const isTablet = screenWidth < 1024;

  return {
    isMobile,
    isTablet,
  };
};
