import React from "react";
import { HtmlDivProps } from "types";
import { useOutsideClick } from "ui";
export interface MenuChildProps {
  OpenMenu: () => any;
  CloseMenu: () => any;
  ToggleMenu: () => any;
  isOpen: boolean;
}
export type ElementChilds<T = MenuChildProps> =
  | React.ReactElement<T>
  | React.ReactElement<T>[];

export interface MenuProps extends Omit<HtmlDivProps, "children"> {
  children:
    | React.ReactElement<MenuChildProps>
    | React.ReactElement<MenuChildProps>[];
}

export const Menu: React.FC<MenuProps> = ({ children, className }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useOutsideClick(ref, handleClose);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleToggle() {
    console.log("works");
    setOpen((state) => !state);
  }
  return (
    <div ref={ref} className={`${className} relative w-fit h-fit`}>
      {Array.isArray(children) ? (
        <>
          {children.map((child, i) =>
            React.cloneElement<MenuChildProps>(child, {
              OpenMenu: handleOpen,
              CloseMenu: handleClose,
              ToggleMenu: handleToggle,
              isOpen: open,
              key: i,
            })
          )}
        </>
      ) : (
        React.cloneElement<MenuChildProps>(children, {
          OpenMenu: handleOpen,
          CloseMenu: handleClose,
          ToggleMenu: handleToggle,
          isOpen: open,
        })
      )}
    </div>
  );
};
