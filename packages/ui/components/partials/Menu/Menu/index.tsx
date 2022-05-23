import React, { createContext } from "react";
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

export interface MenuProps extends HtmlDivProps {
  isLazy?: boolean;
}

export const MenuContext = createContext({
  isOpen: false,
  isLazy: false,
  onClose: () => {},
  onOpen: () => {},
  onToggle: () => {},
});

export const Menu: React.FC<MenuProps> = ({
  isLazy = false,
  children,
  className,
  ...props
}) => {
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
    <MenuContext.Provider
      value={{
        isLazy,
        isOpen: open,
        onClose: handleClose,
        onOpen: handleOpen,
        onToggle: handleToggle,
      }}
    >
      <div {...props} ref={ref} className={`${className} relative w-fit h-fit`}>
        {children}
        {/* {Array.isArray(children) ? (
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
      )} */}
      </div>
    </MenuContext.Provider>
  );
};
