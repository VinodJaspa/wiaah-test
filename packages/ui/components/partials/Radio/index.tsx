import React from "react";
import { HtmlInputProps } from "types";
import { HStack } from "@UI";
export interface RadioProps extends Omit<HtmlInputProps, "type"> {
  colorScheme?: "black" | "primary";
}

export const Radio: React.FC<RadioProps> = ({
  className,
  children,
  id,
  colorScheme = "primary",
  ...props
}) => {
  const getColors = () => {
    switch (colorScheme) {
      case "primary":
        return `checked:bg-primary border-primary  focus:ring-0 checked:focus:bg-primary checked:active:bg-primary checked:hover:bg-primary`;

      case "black":
        return `checked:bg-black border-black  focus:ring-0 checked:focus:bg-black checked:active:bg-black checked:hover:bg-black`;
      default:
        break;
    }
  };

  return (
    <label className="flex items-center gap-2" htmlFor={id}>
      <input
        id={id}
        className={`${className || ""} ${getColors()}`}
        type={"radio"}
        {...props}
      />
      {/* @ts-ignore */}
      {children}
    </label>
  );
};
