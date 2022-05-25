import React from "react";
import { HtmlInputProps } from "types";

export interface CheckboxProps extends HtmlInputProps {
  checked: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ className, ...props }) => {
  return (
    <input
      color="green"
      className={`${className} ring-0 checked:bg-primary   checked:hover:bg-primary checked:focus:bg-primary focus:ring-0  active:ring-0`}
      type={"checkbox"}
      {...props}
    />
  );
};
