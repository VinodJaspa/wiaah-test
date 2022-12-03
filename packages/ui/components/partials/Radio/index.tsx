import React from "react";
import { HtmlInputProps } from "types";
import { HStack } from "ui";
export interface RadioProps extends Omit<HtmlInputProps, "type"> {}

export const Radio: React.FC<RadioProps> = ({
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
        } checked:bg-primary border-primary  focus:ring-0 checked:focus:bg-primary checked:active:bg-primary checked:hover:bg-primary`}
        type={"radio"}
        {...props}
      />
      {children}
    </label>
  );
};
