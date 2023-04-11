import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";

export const CashBackIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_333)">
        <path
          d="M12.4 24L9.40002 19.5H10.9V16.5H13.9V19.5H15.4L12.4 24ZM22.9 1.5V13.5H1.90002V1.5H22.9ZM24.4 0H0.400024V15H24.4V0Z"
          fill="#8811B2"
        />
        <path
          d="M12.4 3C13.5935 3 14.7381 3.47411 15.582 4.31802C16.4259 5.16193 16.9 6.30653 16.9 7.5C16.9 8.69347 16.4259 9.83807 15.582 10.682C14.7381 11.5259 13.5935 12 12.4 12H19.9V10.5H21.4V4.5H19.9V3H12.4ZM7.90002 7.5C7.90002 6.30653 8.37413 5.16193 9.21804 4.31802C10.062 3.47411 11.2066 3 12.4 3H4.90002V4.5H3.40002V10.5H4.90002V12H12.4C11.2066 12 10.062 11.5259 9.21804 10.682C8.37413 9.83807 7.90002 8.69347 7.90002 7.5Z"
          fill="#8811B2"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_333">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.400024)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
