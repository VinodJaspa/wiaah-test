import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";

export interface DotIconProps extends HtmlSvgProps {}

export const DotIcon: React.FC<DotIconProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 4 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2" cy="2.5" r="2" fill="black" />
    </svg>
  );
};
