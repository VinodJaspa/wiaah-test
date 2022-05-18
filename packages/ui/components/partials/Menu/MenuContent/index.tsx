import React from "react";
import { HtmlDivProps } from "types";
import { MenuChildProps } from "ui";

export interface MenuListProps
  extends Partial<MenuChildProps & Omit<HtmlDivProps, "children">> {
  children:
    | React.ReactElement<MenuChildProps>
    | React.ReactElement<MenuChildProps>[];
}

export const MenuList: React.FC<MenuListProps> = ({
  children,
  isOpen,
  ToggleMenu,
  OpenMenu,
  CloseMenu,
  className,
}) => {
  const [showChild, setShowChild] = React.useState<boolean>(false);
  let timeout: NodeJS.Timer;

  React.useEffect(() => {
    if (isOpen) {
      clearTimeout(timeout);
      setShowChild(true);
    } else {
      setTimeout(() => {
        setShowChild(false);
      }, 200);
    }
  }, [isOpen]);

  return (
    <div
      className={`${className} ${
        isOpen ? "scale-100" : "scale-0"
      } z-50 origin-top-right transition-all duration-200 absolute border-gray-200 border-[1px] rounded-xl m-2 py-2 w-fit shadow-lg flex flex-col gap-2 top-full right-0`}
    >
      {showChild && (
        <>
          {Array.isArray(children) ? (
            <>
              {children.map((child, i) =>
                React.cloneElement<MenuChildProps>(child, {
                  OpenMenu,
                  CloseMenu,
                  ToggleMenu,
                  isOpen,
                  key: i,
                })
              )}
            </>
          ) : (
            React.cloneElement<MenuChildProps>(children, {
              OpenMenu,
              CloseMenu,
              ToggleMenu,
              isOpen,
            })
          )}
        </>
      )}
    </div>
  );
};
