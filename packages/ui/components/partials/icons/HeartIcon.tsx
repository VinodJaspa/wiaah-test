import React from "react";
import { HtmlSvgProps } from "types";
import { BsHeart, BsHeartFill } from "react-icons/bs";

export const HeartIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 23 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.046 3.52102C19.5417 3.01652 18.943 2.61632 18.284 2.34327C17.6251 2.07022 16.9188 1.92969 16.2055 1.92969C15.4922 1.92969 14.7858 2.07022 14.1269 2.34327C13.4679 2.61632 12.8692 3.01652 12.3649 3.52102L11.3184 4.56754L10.2719 3.52102C9.2533 2.50244 7.87182 1.93022 6.43134 1.93022C4.99086 1.93022 3.60938 2.50244 2.5908 3.52102C1.57223 4.53959 1 5.92107 1 7.36155C1 8.80204 1.57223 10.1835 2.5908 11.2021L3.63732 12.2486L11.3184 19.9297L18.9995 12.2486L20.046 11.2021C20.5505 10.6978 20.9507 10.0991 21.2237 9.44014C21.4968 8.78117 21.6373 8.07486 21.6373 7.36155C21.6373 6.64825 21.4968 5.94194 21.2237 5.28297C20.9507 4.624 20.5505 4.02528 20.046 3.52102V3.52102Z"
        stroke="currentColor"
        stroke-width="0.125rem"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const HeartOutlineIcon: React.FC<HtmlSvgProps> = (props) => {
  return <BsHeart {...props} />;
};

export const HeartOutlineAltIcon: React.FC<HtmlSvgProps> = (props) => {
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
        d="M12.0491 5.87308C12.6738 2.43514 17.4754 2.21924 19.5457 4.4979C21.5486 6.70231 21.4199 10.4579 19.5457 12.749L12.0491 21L4.55242 12.749C3.55841 11.6547 3 10.1708 3 8.62343C3 7.0761 3.55841 5.59212 4.55242 4.4979C6.48906 2.36638 11.4243 2.43514 12.0491 5.87308Z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const HeartFillIcon: React.FC<HtmlSvgProps> = (props) => {
  return <BsHeartFill />;
};
