import { PassPropsToChild } from "ui";
import React from "react";
import { HtmlDivProps } from "types";
import { MenuContext } from "../Menu";

export interface MenuButtonProps extends Omit<HtmlDivProps, "children"> {}

export const MenuButton: React.FC<MenuButtonProps> = ({ children }) => {
  const { onToggle } = React.useContext(MenuContext);
  return <>{PassPropsToChild(children, { onClick: onToggle })}</>;
};
