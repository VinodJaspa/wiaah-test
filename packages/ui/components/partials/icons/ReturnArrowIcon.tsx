import { HtmlSvgProps } from "types";
import React from "react";

export const ReturnArrowIcon: React.FC<HtmlSvgProps> = (props) => {
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
        d="M6.4999 4L3 7L6.4999 10.5"
        stroke="#EF476F"
        stroke-width="1.4"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3 7H14.4969C17.9384 7 20.861 9.8102 20.9952 13.25C21.1369 16.8848 18.1335 20 14.4969 20H5.9992"
        stroke="#EF476F"
        stroke-width="1.4"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
