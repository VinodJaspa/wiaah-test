import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";

export const BoxIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8571 1H2.14286C1.83975 1 1.54906 1.12041 1.33473 1.33473C1.12041 1.54906 1 1.83975 1 2.14286V15.8571C1 16.1602 1.12041 16.4509 1.33473 16.6653C1.54906 16.8796 1.83975 17 2.14286 17H15.8571C16.1602 17 16.4509 16.8796 16.6653 16.6653C16.8796 16.4509 17 16.1602 17 15.8571V2.14286C17 1.83975 16.8796 1.54906 16.6653 1.33473C16.4509 1.12041 16.1602 1 15.8571 1Z"
        stroke="currentColor"
        stroke-width="1.4"
      />
    </svg>
  );
};

export const FourBoxesIcon: React.FC = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.90909 1H1.75758C1.33918 1 1 1.33918 1 1.75758V6.90909C1 7.32749 1.33918 7.66667 1.75758 7.66667H6.90909C7.32749 7.66667 7.66667 7.32749 7.66667 6.90909V1.75758C7.66667 1.33918 7.32749 1 6.90909 1Z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.2421 1H11.0906C10.6722 1 10.333 1.33918 10.333 1.75758V6.90909C10.333 7.32749 10.6722 7.66667 11.0906 7.66667H16.2421C16.6605 7.66667 16.9997 7.32749 16.9997 6.90909V1.75758C16.9997 1.33918 16.6605 1 16.2421 1Z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.90909 10.3333H1.75758C1.33918 10.3333 1 10.6725 1 11.0909V16.2424C1 16.6608 1.33918 17 1.75758 17H6.90909C7.32749 17 7.66667 16.6608 7.66667 16.2424V11.0909C7.66667 10.6725 7.32749 10.3333 6.90909 10.3333Z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.2421 10.3335H11.0906C10.6722 10.3335 10.333 10.6727 10.333 11.0911V16.2426C10.333 16.661 10.6722 17.0002 11.0906 17.0002H16.2421C16.6605 17.0002 16.9997 16.661 16.9997 16.2426V11.0911C16.9997 10.6727 16.6605 10.3335 16.2421 10.3335Z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
