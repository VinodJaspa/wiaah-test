import React from "react";
import { HtmlDivProps } from "types";
import { useCallbackAfter, useOutsideClick } from "../../../Hooks";

interface ModalContextValues {
  isOpen: boolean;
  onClose: () => any;
  onOpen?: () => any;
}

interface ModalExtendedContextValues {
  isOpen: boolean;
  onOpen: () => any;
}

const ModalExtendedContext = React.createContext<ModalExtendedContextValues>({
  isOpen: false,
  onOpen: () => {},
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
  const { isOpen: ExtendedIsOpen } = React.useContext(ModalExtendedContext);
  React.useEffect(() => {
    if (ExtendedIsOpen) {
      onOpen && onOpen();
    }
  }, [ExtendedIsOpen]);
  return (
    <ModalContext.Provider {...props} value={{ isOpen, onClose, onOpen }} />
  );
};

export interface ModalContentProps extends HtmlDivProps {
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
        show
          ? "-translate-y-1/2"
          : "-translate-y-[calc(50% - 5rem)] pointer-events-none"
      } fixed top-1/2 left-1/2 p-4 z-[60] flex flex-col transition-all rounded bg-white -translate-x-1/2`}
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

export interface ModalButtonProps {}

export const ModalButton: React.FC<ModalButtonProps> = ({ children }) => {
  const { onOpen } = React.useContext(ModalExtendedContext);

  function handleOpen() {
    onOpen();
    console.log("open");
  }

  return <>{PassPropsToChild(children, { onClick: handleOpen })}</>;
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

export interface ModalExtendedWrapperProps {}

export const ModalExtendedWrapper: React.FC<ModalExtendedWrapperProps> = ({
  ...props
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  function onOpen() {
    setOpen(true);
  }

  return (
    <ModalExtendedContext.Provider
      {...props}
      value={{ isOpen: open, onOpen }}
    />
  );
};
