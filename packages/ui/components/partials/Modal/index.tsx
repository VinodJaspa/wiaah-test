import React from "react";
import { HtmlDivProps } from "types";
import { PassPropsToChild, CallbackAfter } from "utils";
import { CloseIcon } from "../icons";
import { cn } from "utils";

interface ModalContextValues {
  isOpen: boolean;
  isLazy: boolean;
  onClose: () => any;
  onOpen: () => any;
  z?: number;
}

interface ModalExtendedContextValues {
  isOpen: (key?: string) => any;
  onOpen: (key?: string) => any;
  onClose: (key?: string) => any;
  closeAll: () => any;
}

const ModalExtendedContext = React.createContext<ModalExtendedContextValues>({
  isOpen: () => { },
  onOpen: () => { },
  onClose: () => { },
  closeAll: () => { },
});

const ModalContext = React.createContext<ModalContextValues>({
  isOpen: false,
  onClose: () => { },
  onOpen: () => { },
  isLazy: false,
});

export interface ModalProps
  extends Omit<ModalContextValues, "isLazy" | "onOpen"> {
  isLazy?: boolean;
  onOpen?: (key?: string) => any;
  z?: number;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onOpen = () => { },
  isLazy,
  z,
  children,
  ...props
}) => {
  const { isOpen: ExtendedIsOpen, onClose: ExtendedOnClose } =
    React.useContext(ModalExtendedContext);
  React.useEffect(() => {
    if (ExtendedIsOpen() && !isOpen) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onOpen && onOpen();
    }
  }, [ExtendedIsOpen]);
  function handleClose() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onClose && onClose();
    ExtendedOnClose();
  }
  return (
    <ModalContext.Provider
      {...props}
      value={{ isOpen, onClose: handleClose, onOpen, isLazy: !!isLazy, z }}
    >
      <div className={`fixed w-full h-full pointer-events-none`}>
        <div {...props} className={`relative w-full h-full isolate`} />
      </div>
      {children}
    </ModalContext.Provider>
  );
};

export interface ModalCloseButtonProps {
  children?: React.ReactNode;
}

export const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
  children,
}) => {
  const { onClose } = React.useContext(ModalContext);
  return <>{PassPropsToChild(children, { onClick: onClose })}</>;
};

export interface ModalContentProps extends HtmlDivProps { }

export const ModalContent: React.FC<ModalContentProps> = ({
  className,
  children,
  ...props
}) => {
  const { isOpen, isLazy, z } = React.useContext(ModalContext);
  const [show, setShow] = React.useState<boolean>(false);
  const contentWrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setShow(true);
      // empty callback to clear timeout function from the previous close
      CallbackAfter(0, () => { });
    } else {
      if (!isLazy) return;
      CallbackAfter(5000, () => {
        setShow(false);
      });
    }
  }, [isOpen]);

  return (
    <div
      {...props}
      ref={contentWrapperRef}
      style={{
        zIndex: z,
      }}
      className={cn(
        "fixed top-1/2 left-1/2 z-[60] transition-all -translate-x-1/2 p-4",
        isOpen
          ? "-translate-y-1/2 bg-white"
          : "-translate-y-[calc(50% - 5rem)] hidden bg-transparent opacity-0 pointer-events-none",
        className,
      )}
    >
      {show ? children : null}
    </div>
  );
};

export interface ModalOverlayProps extends HtmlDivProps { }

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  className,
  ...props
}) => {
  const { isOpen, onClose, z } = React.useContext(ModalContext);
  return (
    <div
      {...props}
      onClick={() => onClose()}
      style={{
        zIndex: z,
      }}
      className={`${className || ""} ${isOpen ? "bg-opacity-60" : "bg-opacity-0 pointer-events-none"
        } fixed top-0 left-0 z-50 transition-all w-screen h-screen bg-black`}
    />
  );
};

export interface ModalFooterProps extends HtmlDivProps {
  left?: boolean;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  className,
  left,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${className || ""} ${left ? "justify-start" : "justify-end"
        } flex gap-2`}
    />
  );
};
export interface ModalHeaderProps extends Omit<HtmlDivProps, "title"> {
  title: React.ReactNode;
  centerTitle?: boolean;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  className,
  children,
  title,
  centerTitle = false,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${className || ""} flex items-center gap-2 justify-between`}
    >
      {centerTitle ? <div></div> : null}
      <span>{title}</span>
      <ModalCloseButton>
        <CloseIcon className="text-2xl" />
      </ModalCloseButton>
    </div>
  );
};
export interface ModalButtonProps extends Partial<ExtendedModalPassedProps> {
  close?: boolean;
  closeAll?: boolean;
  key?: string;
  children: React.ReactNode;
}

export const ModalButton: React.FC<ModalButtonProps> = ({
  children,
  OpenModal,
  CloseModal,
  close,
  closeAll,
  key,
}) => {
  const {
    onClose,
    onOpen,
    closeAll: onCloseAll,
  } = React.useContext(ModalExtendedContext);
  function handleClick() {
    if (closeAll) {
      onCloseAll();
    }
    if (close) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      CloseModal && CloseModal();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      key && onClose(key);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      OpenModal && OpenModal();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      key && onOpen(key);
    }
  }

  return <>{PassPropsToChild(children, { onClick: handleClick })}</>;
};

export interface ModalExtendedWrapperProps {
  modalKey?: string;
  children: React.ReactNode;
}

type ExtendedModalPassedProps = {
  OpenModal: () => any;
  CloseModal: () => any;
};

export const ModalExtendedWrapper: React.FC<ModalExtendedWrapperProps> = ({
  children,
  modalKey = "0",
  ...props
}) => {
  const [keys, setKeys] = React.useState<string[]>([]);

  function isOpen(Key?: string): boolean {
    const key = Key ? Key : modalKey;
    const idx = keys.findIndex((k) => k === key);
    return idx > -1;
  }

  function onOpen(Key?: string) {
    const key = Key ? Key : modalKey;
    setKeys((state) => {
      const newKeys = state.filter((k) => k !== key);
      return [...newKeys, modalKey];
    });
  }
  function onClose(Key?: string) {
    const key = Key ? Key : modalKey;
    setKeys((state) => state.filter((k) => k !== key));
  }

  function closeAll() {
    setKeys([]);
  }

  return (
    <ModalExtendedContext.Provider
      {...props}
      value={{ isOpen, onOpen, onClose, closeAll }}
    >
      {PassPropsToChild<ExtendedModalPassedProps>(children, {
        OpenModal: onOpen,
        CloseModal: onClose,
      })}
    </ModalExtendedContext.Provider>
  );
};

interface ControlledModalProps {
  overlay?: boolean;
  contentProps?: ModalContentProps;
  children?: React.ReactNode;
}

export const ControlledModal: React.FC<ControlledModalProps> = ({
  overlay = true,
  children,
  contentProps,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      {overlay && <ModalOverlay />}
      <ModalContent {...contentProps}>{children}</ModalContent>
    </Modal>
  );
};
