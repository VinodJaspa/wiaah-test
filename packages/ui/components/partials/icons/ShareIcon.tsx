import React from "react";
import { HtmlSvgProps } from "types";

export const ShareIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 7C17.6569 7 19 5.65685 19 4C19 2.34315 17.6569 1 16 1C14.3431 1 13 2.34315 13 4C13 5.65685 14.3431 7 16 7Z"
        stroke="currentColor"
        stroke-width="0.125rem"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 14C5.65685 14 7 12.6569 7 11C7 9.34315 5.65685 8 4 8C2.34315 8 1 9.34315 1 11C1 12.6569 2.34315 14 4 14Z"
        stroke="currentColor"
        stroke-width="0.125rem"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 21C17.6569 21 19 19.6569 19 18C19 16.3431 17.6569 15 16 15C14.3431 15 13 16.3431 13 18C13 19.6569 14.3431 21 16 21Z"
        stroke="currentColor"
        stroke-width="0.125rem"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.58984 12.5078L13.4198 16.4878"
        stroke="currentColor"
        stroke-width="0.125rem"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.4098 5.51172L6.58984 9.49172"
        stroke="currentColor"
        stroke-width="0.125rem"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
