import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";

export const MediaPauseIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="0.8em"
      height="1em"
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 1.5C3 0.671573 2.32843 0 1.5 0C0.671573 0 0 0.671573 0 1.5V8.5C0 9.32843 0.671573 10 1.5 10C2.32843 10 3 9.32843 3 8.5V1.5ZM5 8.5C5 9.32843 5.67157 10 6.5 10C7.32843 10 8 9.32843 8 8.5V1.5C8 0.671573 7.32843 0 6.5 0C5.67157 0 5 0.671573 5 1.5V8.5Z"
        fill="currentColor"
      />
    </svg>
  );
};
