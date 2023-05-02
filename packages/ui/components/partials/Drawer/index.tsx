import React, { CSSProperties } from "react";
import { HtmlDivProps } from "types";
import { PassPropsToChild } from "utils";
import { CloseIcon } from "@UI";
import { bottom } from "./Drawer.stories";

type DrawerPositions = "left" | "right" | "top" | "bottom";

interface DrawerCtxValues {
  position: DrawerPositions;
  isOpen: boolean;
  spaceBottom?: string;
  active?: boolean;
  full?: boolean;
  overlap?: boolean;
  onClose: () => any;
  onOpen: () => any;
}

const DrawerCtx = React.createContext<DrawerCtxValues>({
  isOpen: false,
  position: "left",
  spaceBottom: "0px",
  active: true,
  full: false,
  onClose: () => {},
  onOpen: () => {},
});

export interface DrawerProps
  extends Omit<DrawerCtxValues, "position" | "onOpen"> {
  position?: DrawerPositions;
  active?: boolean;
  onOpen?: () => any;
  isLazy?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  onOpen = () => {},
  position = "left",
  active = true,
  full,
  spaceBottom = "0px",
  overlap,
  isLazy,
  ...props
}) => {
  return (
    <DrawerCtx.Provider
      {...props}
      value={{
        isOpen,
        onClose,
        onOpen,
        position,
        active,
        spaceBottom,
        full,
        overlap,
      }}
    />
  );
};

export interface DrawerContentProps extends HtmlDivProps {}

export const DrawerContent: React.FC<DrawerContentProps> = ({
  children,
  className,
  ...props
}) => {
  const { isOpen, position, active, full, spaceBottom, overlap } =
    React.useContext(DrawerCtx);

  const setPositionClasses = (): {
    className: string;
    styles: CSSProperties;
  } => {
    switch (position) {
      case "bottom":
        return {
          className: `${
            isOpen ? "" : `translate-y-[calc(105%)]`
          } w-full left-0`,
          styles: {
            transform: isOpen
              ? undefined
              : `translate(0,calc(100% + ${spaceBottom}))`,
            height: full
              ? `calc(100% - ${spaceBottom})`
              : `calc(100% - calc(20rem - ${spaceBottom}))`,
            bottom: spaceBottom ? spaceBottom : "0px",
          },
        };
      case "top":
        return {
          className: `${isOpen ? "" : "-translate-y-full"} top-0 ${
            full ? "h-full" : "h-[min(100%,20rem)]"
          } w-full left-0`,
          styles: {},
        };
      case "right":
        return {
          className: `${isOpen ? "" : "translate-x-full"} right-0 ${
            full ? "w-full" : "w-[min(100%,20rem)]"
          } h-full top-0`,
          styles: {},
        };
      default:
        return {
          className: `${isOpen ? "" : "-translate-x-full"} left-0 ${
            full ? "w-full" : "w-[min(100%,20rem)]"
          } h-full top-0`,
          styles: {},
        };
    }
  };

  return active ? (
    <div
      {...props}
      style={{
        ...setPositionClasses().styles,
        ...props.style,
        zIndex: overlap ? 100 : undefined,
      }}
      className={`${className || ""} ${
        setPositionClasses().className
      } z-50 transform transition-all pointer-events-auto overflow-y-scroll thinScroll fixed bg-white`}
    >
      {children}
    </div>
  ) : (
    <>{children}</>
  );
};

export interface DrawerOverlayProps extends HtmlDivProps {}

export const DrawerOverlay: React.FC<DrawerOverlayProps> = ({
  className,
  ...props
}) => {
  const { onClose, isOpen, active, spaceBottom } = React.useContext(DrawerCtx);
  return active ? (
    <div
      onClick={() => onClose()}
      {...props}
      style={{
        bottom: spaceBottom ? spaceBottom : "0px",
      }}
      className={`${
        isOpen
          ? "bg-opacity-30 pointer-events-auto"
          : "bg-opacity-0 pointer-events-none"
      } z-50 bg-black fixed transition-all left-0 w-full h-full`}
    />
  ) : null;
};

export interface DrawerCloseButton {}
export const DrawerCloseButton: React.FC<DrawerCloseButton> = ({
  children,
}) => {
  const { onClose } = React.useContext(DrawerCtx);
  return <>{PassPropsToChild(children, { onClick: () => onClose() })}</>;
};

export interface DrawerHeaderProps extends HtmlDivProps {
  closeButton?: boolean;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  className,
  children,
  closeButton = false,
  ...props
}) => {
  const { active } = React.useContext(DrawerCtx);
  return active ? (
    <div
      className={`${className || ""} flex justify-between items-center`}
      {...props}
    >
      {children}
      {closeButton ? (
        <DrawerCloseButton>
          <CloseIcon className="cursor-pointer" />
        </DrawerCloseButton>
      ) : null}
    </div>
  ) : null;
};
