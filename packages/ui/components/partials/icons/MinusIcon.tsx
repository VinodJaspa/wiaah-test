import React from "react";
import { IconBaseProps } from "react-icons";
import { BiMinus } from "react-icons/bi";

export const MinusIcon: React.FC<IconBaseProps> = ({ className, ...props }) => {
  return (
    <BiMinus
      className={`${className ?? ""} border-current border rounded-full`}
      {...props}
    />
  );
};
