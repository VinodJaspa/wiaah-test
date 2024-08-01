import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";

export const UploadIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.8336 17.5001L24.5517 8.16675L15.167 17.5001M24.5517 8.21575V36.1667M8.16699 28.0001V38.5001C8.16699 39.7377 8.65866 40.9247 9.53383 41.7999C10.409 42.6751 11.596 43.1667 12.8337 43.1667H36.167C37.4047 43.1667 38.5916 42.6751 39.4668 41.7999C40.342 40.9247 40.8336 39.7377 40.8336 38.5001V28.0001"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
