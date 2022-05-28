import React from "react";
import { HtmlDivProps } from "types";
import { MenuContext } from "../Menu";

export interface MenuItemProps extends HtmlDivProps {}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  className,
  ...props
}) => {
  const { onClose } = React.useContext(MenuContext);
  return (
    <div
      {...props}
      onClick={onClose}
      data-testid="MenuItem"
      className={`${
        className || ""
      } px-4 py-1 cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all`}
    >
      {children}
    </div>
  );
};
