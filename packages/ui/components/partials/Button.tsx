import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { HtmlButtonElement } from "types";

export interface ButtonProps extends HtmlButtonElement {}

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={` ${
        className ? className : ""
      } px-4 py-2 bg-primary hover:bg-primary-600 active:bg-primary-700 transition-all rounded-md text-white`}
    >
      {children}
    </button>
  );
};
