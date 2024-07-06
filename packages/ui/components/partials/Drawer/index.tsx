import React, { CSSProperties } from "react";
import { HtmlDivProps } from "types";
import { PassPropsToChild } from "utils";
import { ArrowLeftIcon, CloseIcon } from "@UI";
import { useResponsive } from "hooks";

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
  draggable?: boolean;
}

const DrawerCtx = React.createContext<DrawerCtxValues>({
  isOpen: false,
  position: "left",
  spaceBottom: "0px",
  active: true,
  full: false,
  onClose: () => { },
  onOpen: () => { },
  draggable: false,
});

export interface DrawerProps
  extends Omit<DrawerCtxValues, "position" | "onOpen"> {
  position?: DrawerPositions;
  active?: boolean;
  onOpen?: () => any;
  isLazy?: boolean;
  children?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpen,
  onClose,
  onOpen = () => { },
  position = "left",
  active = true,
  full,
  spaceBottom = "0px",
  overlap,
  isLazy,
  draggable = false,
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
        draggable,
      }}
    >
      {children}
    </DrawerCtx.Provider>
  );
};

export interface DrawerContentProps extends HtmlDivProps { }

export const DrawerContent: React.FC<DrawerContentProps> = ({
  children,
  className,
  ...props
}) => {
  const { isOpen, position, active, full, spaceBottom, overlap, draggable } =
    React.useContext(DrawerCtx);

  const setPositionClasses = (): {
    className: string;
    styles: CSSProperties;
  } => {
    switch (position) {
      case "bottom":
        return {
          className: `${isOpen ? "" : `translate-y-[calc(105%)]`
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
          className: `${isOpen ? "" : "-translate-y-full"} top-0 ${full ? "h-full" : "h-[min(100%,20rem)]"
            } w-full left-0`,
          styles: {},
        };
      case "right":
        return {
          className: `${isOpen ? "" : "translate-x-full"} right-0 ${full ? "w-full" : "w-[min(100%,20rem)]"
            } h-full top-0`,
          styles: {},
        };
      default:
        return {
          className: `${isOpen ? "" : "-translate-x-full"} left-0 ${full ? "w-full" : "w-[min(100%,20rem)]"
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
        overflowY: draggable ? "visible" : "hidden",
      }}
      className={`${className || ""} ${setPositionClasses().className
        } z-50 transform transition-all pointer-events-auto overflow-y-scroll thinScroll fixed bg-white`}
    >
      {draggable && isOpen ? (
        <>
          <div
            style={{
              bottom: `calc(100% - 1px)`,
            }}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <svg
              width="5.18em"
              height="1em"
              className="text-xl text-white"
              viewBox="0 0 1862 359"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M480.5 0C432.727 0 394 38.7274 394 86.5C394 134.273 432.727 173 480.5 173H1380.5C1428.27 173 1467 134.273 1467 86.5C1467 38.7274 1428.27 0 1380.5 0H480.5ZM222.899 86H0V359H1862V86H1641.3C1614.07 86 1592 108.074 1592 135.303C1592 223.225 1520.72 294.5 1432.8 294.5H431.399C342.261 294.5 270 222.239 270 133.101C270 107.088 248.912 86 222.899 86Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div
            style={{
              width: `calc(50% - 3rem)`,
              height: `calc(1rem - 1px)`,
              bottom: `calc(100% - 1px)`,
            }}
            className="rounded-tl-3xl bg-white absolute bottom-full left-0"
          ></div>
          <div
            style={{
              width: `calc(50% - 3rem)`,
              height: `calc(1rem - 1px)`,
              bottom: `calc(100% - 1px)`,
            }}
            className="rounded-tr-3xl bg-white absolute right-0"
          ></div>
        </>
      ) : null}
      {children}
    </div>
  ) : (
    <>{children}</>
  );
};

export interface DrawerOverlayProps extends HtmlDivProps { }

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
      className={`${isOpen
          ? "bg-opacity-30 pointer-events-auto"
          : "bg-opacity-0 pointer-events-none"
        } z-50 bg-black fixed transition-all left-0 w-full h-full`}
    />
  ) : null;
};

export interface DrawerCloseButton {
  children?: React.ReactNode;
}
export const DrawerCloseButton: React.FC<DrawerCloseButton> = ({
  children,
}) => {
  const { onClose } = React.useContext(DrawerCtx);
  return <>{PassPropsToChild(children, { onClick: () => onClose() })}</>;
};

export interface DrawerHeaderProps extends HtmlDivProps {
  closeButton?: boolean;
  onBack?: () => any;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  className,
  children,
  closeButton = false,
  onBack,
  ...props
}) => {
  const { isMobile } = useResponsive();
  const { active } = React.useContext(DrawerCtx);
  return active ? (
    <div
      className={`${className || ""
        } flex justify-between items-center relative`}
      {...props}
    >
      {typeof onBack === "function" ? (
        <div className="absolute top-1/2 -translate-y-1/2">
          <ArrowLeftIcon className="text-2xl" />
        </div>
      ) : null}
      {children}
      {closeButton ? (
        <DrawerCloseButton>
          <CloseIcon className="cursor-pointer" />
        </DrawerCloseButton>
      ) : null}
    </div>
  ) : null;
};
