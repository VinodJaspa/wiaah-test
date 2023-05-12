import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";

export const PayCheckIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.75 8.5H10.75"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.75 6.5V2.5C10.75 2.08579 10.4142 1.75 10 1.75H2C1.58579 1.75 1.25 2.08579 1.25 2.5V9.5C1.25 9.91423 1.58579 10.25 2 10.25H7.11765"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 9.75L7.75 8.5L8.9999 7.25"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.75 3.75L5 5.25L6.25 3.75"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.5 6.75H6.5"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.5 5.25H6.5"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 5.25V8.25"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
