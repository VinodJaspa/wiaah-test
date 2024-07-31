import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";

export const FilterIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      width="1.8em"
      height="1em"
      viewBox="0 0 18 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H17M3.66667 5H14.3333M6.33333 9H11.6667"
        stroke="currentColor"
        stroke-width="1.4"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
