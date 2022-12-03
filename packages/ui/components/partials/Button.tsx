import React from "react";
import { HtmlButtonProps } from "types";
import { CgSpinner } from "react-icons/cg";

type ColorScheme =
  | "primary"
  | "danger"
  | "success"
  | "info"
  | "gray"
  | "white"
  | "lightGray";

export interface ButtonProps extends HtmlButtonProps {
  outline?: boolean;
  colorScheme?: ColorScheme;
  loading?: boolean;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  outline,
  className,
  children,
  colorScheme = "primary",
  loading,
  onClick,
  ...props
}) => {
  const colors = (scheme: ColorScheme): string => {
    switch (scheme) {
      case "primary":
        return "bg-primary border-primary text-white hover:bg-primary-600 active:bg-primary-700";
      case "danger":
        return "bg-red-500 border-red-500 text-white hover:bg-red-600 active:bg-red-700";
      case "info":
        return "bg-cyan-500 border-cyan-400 text-white hover:bg-cyan-600 active:bg-cyan-700";
      case "success":
        return "scheme-success";
      case "gray":
        return "bg-gray-500 border-gray-400 text-white hover:bg-gray-600 active:bg-gray-700";
      case "white":
        return "bg-white border-gray-200 text-black hover:bg-gray-100 active:bg-gray-200";
      case "lightGray":
        return "bg-lightGray border-gray-400 text-white hover:bg-gray-600 active:bg-gray-700";
      default:
        return "scheme-primary";
    }
  };

  return (
    <button
      {...props}
      onClick={(e) => {
        loading ? undefined : onClick && onClick(e);
      }}
      className={` ${className ? className : ""} ${
        outline ? "border-2 text-black hover:text-white bg-transparent" : ""
      } ${colors(colorScheme)} px-4 py-2  transition-colors rounded-md`}
    >
      {loading ? <CgSpinner className="animate-spin" /> : children}
    </button>
  );
};
