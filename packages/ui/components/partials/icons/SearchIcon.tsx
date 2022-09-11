import React from "react";
import { HiSearch } from "react-icons/hi";
import { HtmlDivProps, HtmlSvgProps } from "types";

export interface SearchIconProps extends HtmlSvgProps {}

export const SearchIcon: React.FC<SearchIconProps> = (props) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.39956 0C14.5825 0 18.7984 4.21587 18.7984 9.39884C18.7984 11.8441 17.86 14.0744 16.3243 15.7482L19.346 18.7636C19.6288 19.0464 19.6298 19.5039 19.347 19.7867C19.2061 19.9295 19.0198 20 18.8345 20C18.6502 20 18.4648 19.9295 18.323 19.7886L15.2648 16.739C13.656 18.0273 11.6163 18.7986 9.39956 18.7986C4.21659 18.7986 -0.000244141 14.5818 -0.000244141 9.39884C-0.000244141 4.21587 4.21659 0 9.39956 0ZM9.39956 1.44776C5.01479 1.44776 1.44751 5.01407 1.44751 9.39884C1.44751 13.7836 5.01479 17.3509 9.39956 17.3509C13.7834 17.3509 17.3506 13.7836 17.3506 9.39884C17.3506 5.01407 13.7834 1.44776 9.39956 1.44776Z"
        fill="black"
        fill-opacity="0.6"
      />
    </svg>
  );
};
