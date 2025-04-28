import React, { useContext, useEffect, useState, useCallback } from "react";
import { HtmlDivProps } from "types";
import { MenuContext } from "../Menu";
import { cn } from "utils";

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
  className = "",
  origin = "top right",
  ...props
}) => {
  const { isOpen, isLazy } = useContext(MenuContext);
  const [showChild, setShowChild] = useState(false);

  const handleVisibility = useCallback(() => {
    if (isOpen) {
      setShowChild(true);
    } else if (isLazy) {
      const timeout = setTimeout(() => setShowChild(false), 200);
      return () => clearTimeout(timeout);
    }
    return () => {
      setShowChild(false);
    };
  }, [isOpen, isLazy]);

  useEffect(() => {
    const cleanup = handleVisibility();
    return () => cleanup && cleanup();
  }, [handleVisibility]);

  return (
    <div
      {...props}
      style={{ transformOrigin: origin }}
      className={cn(
        className,
        "z-50 transition-all duration-200 absolute bg-white border border-gray-200 rounded-xl m-2 py-2 shadow-lg flex flex-col gap-2 top-full right-0",
        {
          "scale-100": isOpen,
          "scale-0": !isOpen,
        },
      )}
    >
      {showChild && children}
    </div>
  );
};
