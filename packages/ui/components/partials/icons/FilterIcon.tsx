import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";

export const FilterIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.85693 11.4286H25.1426M9.90455 16H22.095M12.9522 20.5714H19.0474"
        stroke-width="1.14286"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
