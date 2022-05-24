import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { HtmlButtonProps } from "types";

type ColorScheme = "primary" | "danger" | "success" | "info" | "gray";

export interface ButtonProps extends HtmlButtonProps {
  outline?: boolean;
  colorScheme?: ColorScheme;
}

export const Button: FC<ButtonProps> = ({
  outline,
  className,
  children,
  colorScheme = "primary",
  ...props
}) => {
  const colors = (scheme: ColorScheme): string => {
    switch (scheme) {
      case "primary":
        return "scheme-primary";
      case "danger":
        return "scheme-danger";
      case "info":
        return "scheme-info";
      case "success":
        return "scheme-success";
      case "gray":
        return "scheme-gray";
      default:
        return "scheme-primary";
    }
  };

  return (
    <button
      {...props}
      className={` ${className ? className : ""} ${
        outline ? "border-2 text-black hover:text-white bg-transparent" : ""
      } ${colors(colorScheme)} px-4 py-2  transition-all rounded-md`}
    >
      {children}
    </button>
  );
};
