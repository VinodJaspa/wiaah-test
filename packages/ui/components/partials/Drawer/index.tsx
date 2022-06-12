import React from "react";
import { HtmlDivProps } from "types";
import { PassPropsToChild } from "utils";
import { CloseIcon } from "ui";

type DrawerPositions = "left" | "right" | "top" | "bottom";

interface DrawerCtxValues {
  position: DrawerPositions;
  isOpen: boolean;
  onClose: () => any;
  onOpen: () => any;
}

const DrawerCtx = React.createContext<DrawerCtxValues>({
  isOpen: false,
  position: "left",
  onClose: () => {},
  onOpen: () => {},
});

export interface DrawerProps
  extends Omit<DrawerCtxValues, "position" | "onOpen"> {
  position?: DrawerPositions;
  onOpen?: () => any;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  onOpen = () => {},
  position = "left",
  ...props
}) => {
  return (
    <DrawerCtx.Provider
      {...props}
      value={{ isOpen, onClose, onOpen, position }}
    />
  );
};

export interface DrawerContentProps extends HtmlDivProps {}

export const DrawerContent: React.FC<DrawerContentProps> = ({
  children,
  className,
  ...props
}) => {
  const { isOpen, position } = React.useContext(DrawerCtx);

  const setPositionClasses = (): string => {
    switch (position) {
      case "bottom":
        return `${
          isOpen ? "" : "translate-y-full"
        } bottom-0 h-[min(100%,20rem)] w-full left-0`;
      case "top":
        return `${
          isOpen ? "" : "-translate-y-full"
        } top-0 h-[min(100%,20rem)] w-full left-0`;
      case "right":
        return `${
          isOpen ? "" : "translate-x-full"
        } right-0 w-[min(100%,20rem)] h-full top-0`;
      default:
        return `${
          isOpen ? "" : "-translate-x-full"
        } left-0 w-[min(100%,20rem)] h-full top-0`;
    }
  };

  return (
    <div
      {...props}
      className={`${
        className || ""
      } ${setPositionClasses()} transform transition-all fixed bg-white`}
    >
      {children}
    </div>
  );
};

export interface DrawerOverlayProps extends HtmlDivProps {}

export const DrawerOverlay: React.FC<DrawerOverlayProps> = ({
  className,
  ...props
}) => {
  const { onClose, isOpen } = React.useContext(DrawerCtx);
  return (
    <div
      onClick={() => onClose()}
      {...props}
      className={`${
        isOpen
          ? "bg-opacity-30 pointer-events-auto"
          : "bg-opacity-0 pointer-events-none"
      } bg-black fixed transition-all left-0 top-0 w-full h-full`}
    />
  );
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
  return (
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
  );
};
