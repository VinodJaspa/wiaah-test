import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";

export const CardIntelIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 36 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.3862 4.14351L35.3971 23.5016C35.3971 25.7854 33.5118 27.656 31.221 27.656L4.27861 27.6778C1.96582 27.6778 0.0805159 25.8072 0.0805159 23.5342L0.0585938 4.17613C0.0585938 1.88143 1.9439 0.0217507 4.24573 0.0217507L31.199 0C33.5009 0 35.3862 1.84881 35.3862 4.14351Z"
        fill="#F6C859"
      />
    </svg>
  );
};
