import React from "react";
import { HtmlInputProps } from "types";

export interface RadioProps extends HtmlInputProps {}

export const Radio: React.FC<RadioProps> = ({
  type = "radio",
  className,
  ...props
}) => {
  return (
    <input
      className={`${
        className || ""
      } checked:bg-primary focus:ring-0 checked:focus:bg-primary checked:active:bg-primary checked:hover:bg-primary`}
      type={type}
      {...props}
    />
  );
};
