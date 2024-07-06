import { PassPropsToChild } from "utils";
import React from "react";
import { MenuContext } from "../Menu";

export interface MenuButtonProps {
  children?: React.ReactNode;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ children }) => {
  const { onToggle } = React.useContext(MenuContext);
  return <>{PassPropsToChild(children, { onClick: onToggle })}</>;
};
