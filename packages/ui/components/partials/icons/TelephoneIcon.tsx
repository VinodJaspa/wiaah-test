import React from "react";
import { IconBaseProps } from "react-icons";
import { BsTelephone } from "react-icons/bs";
import { HtmlSvgProps } from "types";

export const TelephoneIcon: React.FC<IconBaseProps> = (props) => {
  return <BsTelephone {...props} />;
};

export const TelephoneFillIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinejoin="inherit"
        clipRule="evenodd"
        d="M14.9286 15.7459C21.2272 22.0427 22.656 14.758 26.6664 18.7655C30.5326 22.6307 32.7547 23.4051 27.8562 28.3022C27.2427 28.7953 23.3442 34.7278 9.64366 21.0311C-4.05858 7.33263 1.87047 3.43018 2.36371 2.81676C7.27407 -2.09393 8.03512 0.141131 11.9014 4.00631C15.9117 8.01552 8.63006 9.44908 14.9286 15.7459Z"
        fill="currentColor"
      />
    </svg>
  );
};
