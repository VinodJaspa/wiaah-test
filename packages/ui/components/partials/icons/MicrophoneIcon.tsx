import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";

export const MicrophoneFillIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinejoin="evenodd"
        clipRule="evenodd"
        d="M11.8744 2.98858L12.0001 2.98401C12.4443 2.96757 12.8872 3.04086 13.3024 3.1995C13.7176 3.35814 14.0966 3.59886 14.4166 3.90729C14.7367 4.21572 14.9913 4.58551 15.1652 4.99456C15.339 5.40362 15.4287 5.84353 15.4287 6.28801V10.8572C15.4287 11.7665 15.0675 12.6385 14.4245 13.2815C13.7815 13.9245 12.9094 14.2857 12.0001 14.2857C11.0908 14.2857 10.2187 13.9245 9.57574 13.2815C8.93276 12.6385 8.57153 11.7665 8.57153 10.8572V6.41487C8.57153 5.52732 8.91571 4.67435 9.53168 4.03535C10.1477 3.39636 10.9874 3.02113 11.8744 2.98858Z"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="1.14286"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.7143 10.8571C17.7124 12.3499 17.1264 13.7827 16.0817 14.8489C15.037 15.9152 13.6165 16.5303 12.1241 16.5627C10.6317 16.5951 9.18583 16.0422 8.09583 15.0223C7.00582 14.0024 6.35819 12.5964 6.29148 11.1051L6.28577 10.8571M12.0001 16.5714V21.1429"
        stroke="currentColor"
        stroke-width="1.14286"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
