import React, { useEffect } from "react";

export interface useScreenWidthProps {
  minWidth: number;
}

export const useScreenWidth = ({
  minWidth,
}: useScreenWidthProps): { min: boolean } => {
  const [min, setMin] = React.useState<boolean>(false);

  React.useEffect(() => {
    const width = window.innerWidth;
    handleScreenChange({ target: { outerWidth: width } });
  }, []);

  function handleScreenChange(e: any) {
    const width = e.target.outerWidth;
    if (width <= minWidth) {
      setMin(true);
    } else {
      setMin(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleScreenChange);
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener("resize", handleScreenChange);
    };
  }, []);
  return {
    min,
  };
};

export const useScreenDim = () => {
  const [dims, setDims] = React.useState<{ w: number; h: number }>({
    h: 0,
    w: 0,
  });
  React.useEffect(() => {
    handleScreenChange();
  }, []);

  function handleScreenChange() {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDims({ h: height, w: width });
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleScreenChange);
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener("resize", handleScreenChange);
    };
  }, []);
  return dims;
};
