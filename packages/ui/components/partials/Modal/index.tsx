import React from "react";
import { HtmlDivProps } from "types";
import { useCallbackAfter, useOutsideClick } from "../../../Hooks";

interface ModalContextValues {
  isOpen: boolean;
  onClose: () => any;
  onOpen?: () => any;
}

interface ModalExtendedContextValues {
  isOpen: (key?: string) => any;
  onOpen: (key?: string) => any;
  onClose: (key?: string) => any;
}

const ModalExtendedContext = React.createContext<ModalExtendedContextValues>({
  isOpen: () => {},
  onOpen: () => {},
  onClose: () => {},
});

const ModalContext = React.createContext<ModalContextValues>({
  isOpen: false,
  onClose: () => {},
  onOpen: () => {},
});

export interface ModalProps extends ModalContextValues {}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onOpen,
  ...props
}) => {
  const { isOpen: ExtendedIsOpen, onClose: ExtendedOnClose } =
    React.useContext(ModalExtendedContext);
  React.useEffect(() => {
    if (ExtendedIsOpen()) {
      onOpen && onOpen();
    }
  }, [ExtendedIsOpen]);
  function handleClose() {
    onClose && onClose();
    ExtendedOnClose();
  }
  return (
    <ModalContext.Provider
      {...props}
      value={{ isOpen, onClose: handleClose, onOpen }}
    />
  );
};

export interface ModalContentProps extends Omit<HtmlDivProps, "children"> {
  isLazy?: boolean;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  className,
  children,
  isLazy,
  ...props
}) => {
  const { isOpen, onClose } = React.useContext(ModalContext);
  const [show, setShow] = React.useState<boolean>(false);
  const contentWrapperRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick(contentWrapperRef, onClose);

  React.useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      useCallbackAfter(100, () => setShow(false));
    }
  }, [isOpen]);

  return (
    <div
      {...props}
      ref={contentWrapperRef}
      className={`${className || ""} ${
        isOpen
          ? "-translate-y-1/2"
          : "-translate-y-[calc(50% - 5rem)] opacity-0 pointer-events-none"
      } fixed top-1/2 max-w-[40rem] min-w-[15rem] opacity-100 left-1/2 p-4 z-[60] flex flex-col transition-all rounded bg-white -translate-x-1/2`}
    >
      {show ? children : null}
    </div>
  );
};

export interface ModalOverlayProps extends HtmlDivProps {}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  className,
  ...props
}) => {
  const { isOpen, onClose } = React.useContext(ModalContext);
  return (
    <div
      {...props}
      onClick={() => onClose()}
      className={`${className || ""} ${
        isOpen ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
      } fixed top-0 left-0 z-50 transition-all w-full h-full bg-black `}
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
      className={`${className || ""} ${
        left ? "justify-start" : "justify-end"
      } flex gap-2`}
    />
  );
};

export interface ModalButtonProps extends Partial<ExtendedModalPassedProps> {
  close?: boolean;
  key?: string;
}

export const ModalButton: React.FC<ModalButtonProps> = ({
  children,
  OpenModal,
  CloseModal,
  close,
  key,
}) => {
  const { onClose, onOpen } = React.useContext(ModalExtendedContext);
  function handleClick() {
    if (close) {
      CloseModal && CloseModal();
      key && onClose(key);
    } else {
      OpenModal && OpenModal();
      key && onOpen(key);
    }
  }

  return <>{PassPropsToChild(children, { onClick: handleClick })}</>;
};

export function PassPropsToChild<T = HtmlDivProps>(
  children: React.ReactNode,
  props: T
): React.ReactNode {
  function clone(children: React.ReactNode) {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, props);
    } else {
      return <></>;
    }
  }

  return Array.isArray(children)
    ? children.map((child) => clone(child))
    : clone(children);
}

export interface ModalExtendedWrapperProps {
  modalKey: string;
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

  return (
    <ModalExtendedContext.Provider
      {...props}
      value={{ isOpen, onOpen, onClose }}
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
