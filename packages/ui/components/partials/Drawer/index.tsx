import React from "react";
import { HtmlDivProps } from "types";
import { PassPropsToChild } from "utils";
import { CloseIcon } from "ui";

type DrawerPositions = "left" | "right" | "top" | "bottom";

interface DrawerCtxValues {
  position: DrawerPositions;
  isOpen: boolean;
  active?: boolean;
  full?: boolean;
  onClose: () => any;
  onOpen: () => any;
}

const DrawerCtx = React.createContext<DrawerCtxValues>({
  isOpen: false,
  position: "left",
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
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  onOpen = () => {},
  position = "left",
  active = true,
  full,
  ...props
}) => {
  return (
    <DrawerCtx.Provider
      {...props}
      value={{ isOpen, onClose, onOpen, position, active, full }}
    />
  );
};

export interface DrawerContentProps extends HtmlDivProps {}

export const DrawerContent: React.FC<DrawerContentProps> = ({
  children,
  className,
  ...props
}) => {
  const { isOpen, position, active, full } = React.useContext(DrawerCtx);

  const setPositionClasses = (): string => {
    switch (position) {
      case "bottom":
        return `${isOpen ? "" : "translate-y-full"} bottom-0 ${
          full ? "h-full" : "h-[min(100%,20rem)]"
        } w-full left-0`;
      case "top":
        return `${isOpen ? "" : "-translate-y-full"} top-0 ${
          full ? "h-full" : "h-[min(100%,20rem)]"
        } w-full left-0`;
      case "right":
        return `${isOpen ? "" : "translate-x-full"} right-0 ${
          full ? "w-full" : "w-[min(100%,20rem)]"
        } h-full top-0`;
      default:
        return `${isOpen ? "" : "-translate-x-full"} left-0 ${
          full ? "w-full" : "w-[min(100%,20rem)]"
        } h-full top-0`;
    }
  };

  return active ? (
    <div
      {...props}
      className={`${
        className || ""
      } ${setPositionClasses()} z-50 transform transition-all fixed bg-white`}
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
  const { onClose, isOpen, active } = React.useContext(DrawerCtx);
  return active ? (
    <div
      onClick={() => onClose()}
      {...props}
      className={`${
        isOpen
          ? "bg-opacity-30 pointer-events-auto"
          : "bg-opacity-0 pointer-events-none"
      } z-50 bg-black fixed transition-all left-0 top-0 w-full h-full`}
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
