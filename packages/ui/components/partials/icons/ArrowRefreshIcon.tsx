import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";

export const ArrowRefreshIcon: React.FC<HtmlSvgProps> = (props) => {
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
        d="M14.8564 9.143H20.5707V3.42871"
        stroke="currentColor"
        stroke-width="1.14286"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.571 9.143C17.3287 5.33385 14.091 3.42871 10.8567 3.42871C7.62244 3.42871 4.7653 4.57157 2.2853 6.85728M7.42815 13.143H1.71387V18.8573"
        stroke="currentColor"
        stroke-width="1.14286"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1.71387 13.1426C4.95615 16.9517 8.19387 18.8569 11.4282 18.8569C14.6624 18.8569 17.5196 17.714 19.9996 15.4283"
        stroke="currentColor"
        stroke-width="1.14286"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
