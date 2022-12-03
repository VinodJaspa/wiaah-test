import React from "react";
import { throttle } from "utils";

export function useDimensions<T = HTMLDivElement>(
  ref: React.RefObject<HTMLDivElement>
) {
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);

  function handleResize() {
    if (ref && ref.current && ref.current.getBoundingClientRect) {
      const rect = ref.current.getBoundingClientRect();
      setWidth(rect.width);
      setHeight(rect.height);
    }
  }

  React.useEffect(() => {
    if (window) {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    height,
  };
}
