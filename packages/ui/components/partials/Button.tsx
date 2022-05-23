import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { HtmlButtonProps } from "types";

export interface ButtonProps extends HtmlButtonProps {
  outline?: boolean;
}

export const Button: FC<ButtonProps> = ({
  outline,
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={` ${className ? className : ""} ${
        outline
          ? "border-2 text-primary hover:bg-primary-100 active:bg-primary-200"
          : "bg-primary text-white hover:bg-primary-600 active:bg-primary-700"
      } px-4 py-2 border-primary  transition-all rounded-md`}
    >
      {children}
    </button>
  );
};
