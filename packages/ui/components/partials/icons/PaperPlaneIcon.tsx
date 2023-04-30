import React from "react";
import { HtmlSvgProps } from "types";

export const PaperPlaneIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.3636 0.137443L1.12239 7.63344C-0.751417 8.50804 -0.126815 11.2564 1.87199 11.2564H8.74339V18.1278C8.74339 20.1266 11.4918 20.7516 12.3664 18.8774L19.8624 2.63624C20.487 1.13665 18.8628 -0.487549 17.3636 0.137443V0.137443Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const PaperPlaneAngleIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.6666 3.28662L14 13.9973ZM18 24.6666L14 13.9973L4.66663 9.99995L24.6666 3.33329L18 24.6666Z"
        fill="currentColor"
      />
      <path
        d="M24.6666 3.28662L14 13.9973M14 13.9973L18 24.6666L24.6666 3.33329L4.66663 9.99995L14 13.9973Z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
