import React from "react";
import { IconBaseProps } from "react-icons";

export const PlusIcon: React.FC<IconBaseProps> = ({ ...props }) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.619049 3H5.38095M3 0.619049V5.38095"
        stroke="currentColor"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const RoundedPlusIcon: React.FC<IconBaseProps> = ({ ...props }) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.2852 11.5238H14.6662M10.4757 15.7729V7.3333M10.4757 19.9047C15.125 19.9047 18.8566 16.2108 18.8566 11.5615C18.8566 6.91216 15.125 3.14282 10.4757 3.14282C5.82635 3.14282 2.09473 6.91216 2.09473 11.5615C2.09473 16.2108 5.82635 19.9047 10.4757 19.9047Z"
        stroke="currentColor"
        stroke-width="1.14286"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
