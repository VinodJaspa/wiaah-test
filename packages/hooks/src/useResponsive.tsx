import React from "react";

export const useResponsive = () => {
  const [screenWidth, setScreenWidth] = React.useState<number>(0);
  const [refresher, setRefresher] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log("screenWidth", screenWidth);
  }, [screenWidth]);

  function HandleScreenSize() {
    if (window) {
      console.log("test");
      setScreenWidth(window.innerWidth);
      setRefresher((state) => !state);
    }
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", HandleScreenSize);
    }
    HandleScreenSize();
    return () => {
      window.removeEventListener("resize", HandleScreenSize);
    };
  }, []);

  const isMobile = screenWidth < 640;
  const isTablet = screenWidth < 1024;

  return {
    isMobile,
    isTablet,
  };
};
