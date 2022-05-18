import React from "react";
import { HtmlDivProps } from "types";
import { MenuChildProps } from "ui";

export interface MenuItemProps extends Partial<HtmlDivProps & MenuChildProps> {}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  className,
  CloseMenu,
}) => {
  return (
    <div
      onClick={CloseMenu}
      className={`${className} px-4 py-1 cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all `}
    >
      {children}
    </div>
  );
};
