import { CallbackAfter } from "@UI/../utils/src";
import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";

// export const useResponsive = () => {
//   const isMobile = useBreakpointValue({ base: true, sm: false });
//   const isTablet = useBreakpointValue({ base: true, lg: false });

//   return {
//     isMobile,
//     isTablet,
//   };
// };

export const useResponsive = (cb?: () => any) => {
  const [screenWidth, setScreenWidth] = React.useState<number>(0);

  function HandleScreenSize() {
    if (
      typeof window !== "undefined" &&
      typeof window.innerWidth !== "undefined"
    ) {
      cb && cb();
      setScreenWidth(window.innerWidth);
      console.log("responsive", window.innerWidth);
    } else {
      CallbackAfter(100, HandleScreenSize);
    }
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", HandleScreenSize);
      window.addEventListener("load", HandleScreenSize);
      window.addEventListener("DOMContentLoaded", HandleScreenSize);
    }
    if (typeof document !== "undefined") {
      document.addEventListener("DOMContentLoaded", HandleScreenSize);
      document.addEventListener("load", HandleScreenSize);
    }
    HandleScreenSize();
    return () => {
      document.removeEventListener("DOMContentLoaded", HandleScreenSize);
      document.removeEventListener("load", HandleScreenSize);
      window.removeEventListener("resize", HandleScreenSize);
      window.removeEventListener("load", HandleScreenSize);
      window.removeEventListener("DOMContentLoaded", HandleScreenSize);
    };
  }, [typeof window, typeof document]);

  const isMobile = screenWidth < 640;
  const isTablet = screenWidth < 1024;

  return {
    isMobile,
    isTablet,
    screenWidth,
  };
};
