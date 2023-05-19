import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { IconBaseProps } from "react-icons";
import { HtmlSvgProps } from "@UI/../types/src";

export const ArrowRightIcon: React.FC<IconBaseProps> = (props) => {
  return <BiChevronRight {...props} />;
};

export const ArrowRightAltIcon: React.FC<HtmlSvgProps> = (props) => {
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
        d="M13.6663 7.00002L6.99967 13.6667L5.81217 12.5L10.4788 7.83335L0.333008 7.83335L0.333008 6.16669L10.4788 6.16669L5.81217 1.50002L6.99967 0.333354L13.6663 7.00002Z"
        fill="currentColor"
      />
    </svg>
  );
};
