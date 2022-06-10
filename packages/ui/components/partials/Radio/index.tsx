import React from "react";
import { HtmlInputProps } from "types";
import { HStack } from "ui";
export interface RadioProps extends HtmlInputProps {}

export const Radio: React.FC<RadioProps> = ({
  type = "radio",
  className,
  children,
  id,
  ...props
}) => {
  return (
    <label className="flex items-center gap-2" htmlFor={id}>
      <input
        id={id}
        className={`${
          className || ""
        } checked:bg-primary focus:ring-0 checked:focus:bg-primary checked:active:bg-primary checked:hover:bg-primary`}
        type={type}
        {...props}
      />
      {children}
    </label>
  );
};
