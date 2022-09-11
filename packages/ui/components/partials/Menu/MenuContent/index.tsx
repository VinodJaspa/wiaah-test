import React from "react";
import { HtmlDivProps } from "types";
import { MenuContext } from "../Menu";

export interface MenuListProps extends HtmlDivProps {
  origin?:
    | "top left"
    | "top"
    | "top right"
    | "center left"
    | "center"
    | "center right"
    | "bottom left"
    | "bottom"
    | "bottom right";
}

export const MenuList: React.FC<MenuListProps> = ({
  children,
  className,
  origin = "top right",
  ...props
}) => {
  const { isOpen, isLazy } = React.useContext(MenuContext);
  const [showChild, setShowChild] = React.useState<boolean>(false);
  let timeout: NodeJS.Timer;

  React.useEffect(() => {
    if (isOpen) {
      clearTimeout(timeout);
      setShowChild(true);
    } else {
      if (!isLazy) return;
      setTimeout(() => {
        setShowChild(false);
      }, 200);
    }
  }, [isOpen]);

  return (
    <div
      {...props}
      style={{
        transformOrigin: origin,
      }}
      data-testid="MenuList"
      className={`${className || ""} ${
        isOpen ? "scale-100" : "scale-0"
      } z-50 transition-all duration-200 absolute bg-white border-gray-200 border-[1px] rounded-xl m-2 py-2 w-fit shadow-lg flex flex-col gap-2 top-full right-0`}
    >
      {showChild && <>{children}</>}
    </div>
  );
};
