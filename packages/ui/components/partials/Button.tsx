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
  | "lightGray"
  | "darkbrown";

export interface ButtonProps extends HtmlButtonProps {
  outline?: boolean;
  colorScheme?: ColorScheme;
  loading?: boolean;
  center?: boolean;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  outline,
  className,
  children,
  colorScheme = "primary",
  loading,
  onClick,
  center,
  ...props
}) => {
  const colors = (scheme: ColorScheme): { outline: string; solid: string } => {
    switch (scheme) {
      case "primary":
        return {
          outline:
            "border-primary border text-primary hover:bg-primary-100 active:bg-primary-200",
          solid:
            "bg-primary border-primary text-white hover:bg-primary-600 active:bg-primary-700",
        };
      case "danger":
        return {
          outline:
            "border-red-500 border text-red-500 hover:bg-red-100 active:bg-red-200",
          solid:
            "bg-[#E20000] border-red-500 text-white hover:bg-red-600 active:bg-red-700",
        };
      case "info":
        return {
          outline:
            "border-cyan-400 border text-cyan-400 hover:bg-cyan-100 active:bg-cyan-200\\",
          solid:
            "bg-cyan-500 border-cyan-400 text-white hover:bg-cyan-600 active:bg-cyan-700",
        };

      case "gray":
        return {
          outline:
            "border-gray-400 border text-gray-400 hover:bg-gray-100 active:bg-gray-200",
          solid:
            "bg-[#E5E5E5] border-gray-400 text-black hover:bg-gray-600 active:bg-gray-700",
        };
      case "white":
        return {
          outline:
            "border-white border text-white hover:bg-gray-100 active:bg-gray-200",
          solid:
            "bg-white border-gray-200 text-black hover:bg-gray-100 active:bg-gray-200",
        };
      case "lightGray":
        return {
          outline:
            "border-gray-400 border text-gray-400 hover:bg-gray-100 active:bg-gray-200",
          solid:
            "bg-lightGray border-gray-400 text-black hover:bg-gray-600 active:bg-gray-700",
        };
      case "darkbrown":
        return {
          outline: "border border-brownBtn text-brownBtn",
          solid:
            "bg-brownBtn disabled:bg-[#D3D3D3] disabled:text-[#969696]  text-white",
        };
      default:
        return {
          outline: "",
          solid: "",
        };
    }
  };

  return (
    <button
      {...props}
      onClick={(e) => {
        loading || !!props?.disabled ? undefined : onClick && onClick(e);
      }}
      className={` ${className ? className : ""} ${
        outline ? colors(colorScheme).outline : colors(colorScheme).solid
      } ${
        center ? "flex justify-center items-center" : "px-4 py-2"
      } transition-colors rounded-md bg-`}
    >
      {loading ? <CgSpinner className="animate-spin" /> : children}
    </button>
  );
};

export const AddToCartProductButton: React.FC<
  ButtonProps & {
    productId: string;
  }
> = ({ productId, ...props }) => {
  // TODO: switch if product is external
  return <Button {...props} />;
};

export const BookServiceButton: React.FC<
  ButtonProps & {
    serviceId: string;
  }
> = ({ serviceId, ...props }) => {
  return <Button {...props} />;
};
