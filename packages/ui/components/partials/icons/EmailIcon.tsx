import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";
import { IconBaseProps } from "react-icons";
import { MdEmail } from "react-icons/md";

export const EmailIcon: React.FC<IconBaseProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 34 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24.8983 0C27.1333 0 29.2833 0.883333 30.865 2.46833C32.4483 4.05 33.3333 6.18333 33.3333 8.41667V21.5833C33.3333 26.2333 29.55 30 24.8983 30H8.43333C3.78167 30 0 26.2333 0 21.5833V8.41667C0 3.76667 3.765 0 8.43333 0H24.8983ZM26.7833 8.66667C26.4333 8.64833 26.1 8.76667 25.8483 9L18.3333 15C17.3667 15.8017 15.9817 15.8017 15 15L7.5 9C6.98167 8.61667 6.265 8.66667 5.83333 9.11667C5.38333 9.56667 5.33333 10.2833 5.715 10.7833L5.93333 11L13.5167 16.9167C14.45 17.65 15.5817 18.05 16.7667 18.05C17.9483 18.05 19.1 17.65 20.0317 16.9167L27.55 10.9L27.6833 10.7667C28.0817 10.2833 28.0817 9.58333 27.665 9.1C27.4333 8.85167 27.115 8.7 26.7833 8.66667Z" />
    </svg>
  );
};

export const EmailArrowDownIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      height="1em"
      width="1em"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 495 495"
    >
      <g>
        <polygon
          fill="#46F8FF"
          points="286.2,332.135 286.38,332.135 465,495 465,169.46 	"
        />
        <polygon
          fill="#9BFBFF"
          points="465,169.46 347.037,169.46 247.5,278.528 147.963,169.46 30,169.46 247.5,367.23 	"
        />
        <polygon
          fill="#00E7F0"
          points="286.2,332.135 247.5,367.23 208.71,332.135 30,495 465,495 286.38,332.135 	"
        />
        <polygon fill="#46F8FF" points="30,169.46 30,495 208.71,332.135 	" />
        <polygon
          fill="#2488FF"
          points="247.5,0 163.07,0 163.07,114.43 97.741,114.43 147.963,169.46 247.5,278.528 	"
        />
        <polygon
          fill="#005ECE"
          points="347.037,169.46 397.259,114.43 331.93,114.43 331.93,0 247.5,0 247.5,278.528 	"
        />
      </g>
    </svg>
  );
};
