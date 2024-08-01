import { HtmlSvgProps } from "types";
import React from "react";

export const HexagonStatsIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5 7L12 2L3.5 7V17L12 22L20.5 17V7Z"
        stroke="#06D6A0"
        strokeWidth="1.4"
        stroke-linejoin="round"
      />
      <path
        d="M12 11V15M16 9V15M8 13V15"
        stroke="#06D6A0"
        strokeWidth="1.4"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
