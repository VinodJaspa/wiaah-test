import React from "react";

export type ScrollToElementType = {
  key: string;
  ref: React.RefObject<HTMLElement>;
};

export const useScrollTo = (elements: ScrollToElementType[]) => {
  const ScrollTo = (elementKey: string) => {
    const targetElement = elements.find((e) => e.key === elementKey);
    console.log("scrollto", elements, targetElement, elementKey);
    if (!targetElement) return;

    targetElement.ref.current?.scrollIntoView();
  };

  return {
    ScrollTo,
  };
};
