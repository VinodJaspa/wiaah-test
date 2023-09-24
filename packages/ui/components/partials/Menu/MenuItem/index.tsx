import React from "react";
import { HtmlDivProps } from "types";
import { MenuContext } from "../Menu";

export interface MenuItemProps extends HtmlDivProps {}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  className,
  onClick,
  ...props
}) => {
  const { onClose } = React.useContext(MenuContext);
  return (
    <div
      {...props}
      onClick={(e) => {
        onClick && onClick(e);
        onClose();
      }}
      className={`${
        className || ""
      } px-4 py-1 cursor-pointer whitespace-nowrap hover:bg-gray-200 active:bg-gray-300 transition-all`}
    >
      {children}
    </div>
  );
};
