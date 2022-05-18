import React from "react";
import { HtmlDivProps } from "types";
import { MenuChildProps } from "ui";

export interface MenuButtonProps extends Partial<MenuChildProps> {}

export const MenuButton: React.FC<MenuButtonProps> = ({
  ToggleMenu,
  children,
}) => {
  return <div onClick={ToggleMenu}>{children}</div>;
};
