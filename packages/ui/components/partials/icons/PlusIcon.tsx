import React from "react";
import { IconBaseProps } from "react-icons";
import { BiPlus } from "react-icons/bi";

export const PlusIcon: React.FC<IconBaseProps> = ({ className, ...props }) => {
  return (
    <BiPlus
      className={`${className ?? ""} border-gray-500 border rounded-full`}
      {...props}
    />
  );
};
