import { useEffect, useState } from "react";

export const useResponsive = (cb?: () => any) => {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  // Function to handle screen size changes
  function HandleScreenSize() {
    if (
      typeof window !== "undefined" &&
      typeof window.innerWidth !== "undefined"
    ) {
      cb && cb();
      setScreenWidth(window.innerWidth);
      console.log("responsive", window.innerWidth);
    }
  }

  useEffect(() => {
    // Run the effect only on the client side
    if (typeof window !== "undefined") {
      // Call once on mount
      HandleScreenSize();

      // Add event listener for resize
      window.addEventListener("resize", HandleScreenSize);

      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener("resize", HandleScreenSize);
      };
    }
  }, [cb]);

  const isMobile = screenWidth < 640;
  const isTablet = screenWidth < 1024;

  return {
    isMobile,
    isTablet,
    screenWidth,
  };
};
