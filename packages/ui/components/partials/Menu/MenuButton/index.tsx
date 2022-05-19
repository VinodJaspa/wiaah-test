import React from "react";
import { HtmlDivProps } from "types";
import { MenuChildProps } from "ui";
import { ElementChilds } from "../Menu";

export interface MenuButtonProps
  extends Partial<MenuChildProps & Omit<HtmlDivProps, "children">> {
  children: ElementChilds;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  ToggleMenu,
  children,
}) => {
  return (
    <>
      {!Array.isArray(children) &&
        React.cloneElement(children, { onClick: ToggleMenu })}
    </>
  );
};
