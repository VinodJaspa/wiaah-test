import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";

export const VolumeIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="0.85em"
      height="1em"
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5715 16.0716C15.0949 14.9287 15.8572 13.0236 15.8572 10.3573C15.8572 7.69098 15.0949 5.78584 13.5715 4.64298M13.5715 8.07155V12.643M2.14292 6.92869H5.57149L11.2858 1.21441V19.5001L5.57149 13.7858H2.14292C1.83981 13.7858 1.54912 13.6654 1.3348 13.4511C1.12047 13.2368 1.00006 12.9461 1.00006 12.643V8.07155C1.00006 7.76845 1.12047 7.47776 1.3348 7.26343C1.54912 7.0491 1.83981 6.92869 2.14292 6.92869Z"
        stroke="currentColor"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
