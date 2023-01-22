import React from "react";
import { usePaginationControlsOptions } from "..";

export const ScrollPaginationWrapper: React.FC<{
  controls: usePaginationControlsOptions;
}> = ({ children, controls }) => {
  const [endTriggered, setEndTriggered] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleEndReached = () => {
    console.log("handling reached");
    if (!endTriggered) {
      console.log("end reached triggered");
      setEndTriggered(true);
    }
  };

  if (typeof document !== "undefined" && typeof window !== "undefined") {
    document.addEventListener("scroll", (e) => {
      const screenH = window.screen.height;

      if (ref.current) {
        const dims = ref.current.getBoundingClientRect();

        if (dims.y - screenH + dims.height < 1) {
          handleEndReached();
        }
      }
    });
  }

  return <div ref={ref}>{children}</div>;
};
