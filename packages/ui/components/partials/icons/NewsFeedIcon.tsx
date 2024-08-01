import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";
import { IconType } from "react-icons";

export const NewsFeedIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="0.9em"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 3.5H2.5V4V10V10.5H3H8H8.5V10V4V3.5H8H3ZM17 14.5H17.5V14V12V11.5H17H3H2.5V12V14V14.5H3H17ZM17 10.5H17.5V10V8V7.5H17H10H9.5V8V10V10.5H10H17ZM17 6.5H17.5V6V4V3.5H17H10H9.5V4V6V6.5H10H17ZM2 0.5H18C18.8339 0.5 19.5 1.16614 19.5 2V16C19.5 16.8339 18.8339 17.5 18 17.5H2C1.16614 17.5 0.5 16.8339 0.5 16V2C0.5 1.16614 1.16614 0.5 2 0.5Z"
        fill="#111312"
        stroke="#111312"
      />
    </svg>
  );
};

export const NewsFeedOutlineIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="0.9em"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 1H3C1.89 1 1 1.89 1 3V17C1 18.11 1.89 19 3 19H19C20.11 19 21 18.11 21 17V3C21 1.89 20.11 1 19 1ZM4 5H9V11H4V5ZM18 15H4V13H18V15ZM18 11H11V9H18V11ZM18 7H11V5H18V7Z"
        stroke="#111312"
        strokeLinejoin="round"
      />
    </svg>
  );
};
