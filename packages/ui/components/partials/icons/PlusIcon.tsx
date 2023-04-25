import React from "react";
import { IconBaseProps } from "react-icons";
import { BiPlus } from "react-icons/bi";

export const PlusIcon: React.FC<IconBaseProps> = ({ className, ...props }) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.619049 3H5.38095M3 0.619049V5.38095"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const RoundedPlusIcon: React.FC<IconBaseProps> = ({
  className,
  ...props
}) => {
  return (
    <BiPlus className={`${className ?? ""} border rounded-full`} {...props} />
  );
};
