import React from "react";
import { CallbackAfter } from "utils";

export const useResponsive = (cb?: () => any) => {
  const [screenWidth, setScreenWidth] = React.useState<number>(0);
  const [isBrowser, setIsBrowser] = React.useState<boolean>(false);

  function HandleScreenSize() {
    if (isBrowser && typeof window !== "undefined") {
      cb && cb();
      setScreenWidth(window.innerWidth);
      console.log("responsive", window.innerWidth);
    } else {
      CallbackAfter(100, HandleScreenSize);
    }
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true); // Check if running in browser
      window.addEventListener("resize", HandleScreenSize);
      window.addEventListener("load", HandleScreenSize);
    }

    if (typeof document !== "undefined") {
      document.addEventListener("DOMContentLoaded", HandleScreenSize);
      document.addEventListener("load", HandleScreenSize);
    }

    HandleScreenSize(); // Initial call

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("DOMContentLoaded", HandleScreenSize);
        document.removeEventListener("load", HandleScreenSize);
      }
      if (isBrowser) {
        window.removeEventListener("resize", HandleScreenSize);
        window.removeEventListener("load", HandleScreenSize);
      }
    };
  }, [isBrowser]);

  const isMobile = screenWidth < 640;
  const isTablet = screenWidth < 1024;

  return {
    isMobile,
    isTablet,
    isPortable: isMobile || isTablet,
    screenWidth,
  };
};
