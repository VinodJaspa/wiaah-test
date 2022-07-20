import { useEffect, useState } from "react";
import { throttle } from "../Throttle";

export function useElementScrolling(elementRef: React.RefObject<HTMLElement>) {
  const [passed, setPassed] = useState<boolean>(false);
  const [y, setY] = useState<number | null>(0);
  const documentDep = typeof document;

  function handleScrolling() {
    if (elementRef) {
      const { current } = elementRef;
      if (current) {
        const currentY = current.getBoundingClientRect().y;
        if (currentY < 0) {
          if (passed) return;
          setY(currentY);
          setPassed(true);
          console.log("passed");
        } else {
          console.log("not passed");
          if (!passed) return;
          console.log("not passed 2");
          setPassed(false);
          setY(currentY);
        }
      }
    }
  }

  useEffect(() => {
    const cb = throttle(() => handleScrolling(), 50);
    document.addEventListener("scroll", () => cb());

    return document.removeEventListener("scroll", cb);
  }, [documentDep]);

  return {
    passed,
    y,
  };
}
