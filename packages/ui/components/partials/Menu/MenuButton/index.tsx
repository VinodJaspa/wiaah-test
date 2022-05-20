import React from "react";
import { HtmlDivProps } from "types";
import { MenuChildProps } from "ui";
import { ElementChilds, MenuContext } from "../Menu";

export interface MenuButtonProps extends Omit<HtmlDivProps, "children"> {
  children: React.ReactElement;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ children }) => {
  const { onToggle } = React.useContext(MenuContext);
  return (
    <>
      {!Array.isArray(children) &&
        React.cloneElement(children, { onClick: onToggle })}
    </>
  );
};
