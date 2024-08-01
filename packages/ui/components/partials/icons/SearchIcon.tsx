import React from "react";
import { HiSearch } from "react-icons/hi";
import { HtmlDivProps, HtmlSvgProps } from "types";

export interface SearchIconProps extends HtmlSvgProps {}

export const SearchIcon: React.FC<SearchIconProps> = (props) => {
  return (
    <svg
      width="1.125rem"
      height="1.125rem"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1.125rem" height="1.125rem" rx="9" fill="white" />
      <path
        d="M7.28571 11.5714C9.65265 11.5714 11.5714 9.65265 11.5714 7.28571C11.5714 4.91878 9.65265 3 7.28571 3C4.91878 3 3 4.91878 3 7.28571C3 9.65265 4.91878 11.5714 7.28571 11.5714Z"
        stroke="black"
        strokeWidth="1.14286"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.0603 14.9994L10.2852 10.2852"
        stroke="black"
        strokeWidth="1.14286"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
