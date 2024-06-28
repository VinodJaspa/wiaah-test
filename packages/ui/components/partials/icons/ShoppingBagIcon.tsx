import React from "react";
import { HtmlSvgProps } from "types";

export interface ShoppingBagOutlineIconProps extends HtmlSvgProps {}

export const ShoppingBagIcon: React.FC<ShoppingBagOutlineIconProps> = (
  props,
) => {
  return (
    <svg
      {...props}
      width="0.9em"
      height="1em"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 7H2L1 19H17L16 7H13H5Z" fill="#111312" />
      <path
        d="M13 9V7M5 9V7M5 7H2L1 19H17L16 7H13M5 7H13M5 7V5C5 3.93913 5.42143 2.92172 6.17157 2.17157C6.92172 1.42143 7.93913 1 9 1C10.0609 1 11.0783 1.42143 11.8284 2.17157C12.5786 2.92172 13 3.93913 13 5V7"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export interface ShoppingBagOutlineIconProps extends HtmlSvgProps {}

export const ShoppingBagOutlineIcon: React.FC<ShoppingBagOutlineIconProps> = (
  props,
) => {
  return (
    <svg
      {...props}
      width="0.9em"
      height="1em"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 9V5C13 3.93913 12.5786 2.92172 11.8284 2.17157C11.0783 1.42143 10.0609 1 9 1C7.93913 1 6.92172 1.42143 6.17157 2.17157C5.42143 2.92172 5 3.93913 5 5V9M2 7H16L17 19H1L2 7Z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
