import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";
import { IconBaseProps } from "react-icons";
import { BsClock } from "react-icons/bs";

export const ClockIcon: React.FC<IconBaseProps> = (props) => {
  return <BsClock {...props} />;
};

export const ClockOutlineIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.00004 12.3333C4.05452 12.3333 1.66671 9.94548 1.66671 6.99996C1.66671 4.05444 4.05452 1.66663 7.00004 1.66663C9.94556 1.66663 12.3334 4.05444 12.3334 6.99996C12.3334 9.94548 9.94556 12.3333 7.00004 12.3333Z"
        stroke="currentColor"
        stroke-width="1.14286"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.00004 5V7.66667H9.33337"
        stroke="currentColor"
        stroke-width="1.14286"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
