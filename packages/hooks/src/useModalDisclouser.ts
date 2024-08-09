import React from "react";

interface UseModalDisclosureProps {
  onClose?: () => void;
  onOpen?: () => void;
}

interface UseModalDisclosureReturn {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export const useModalDisclouser = (
  props: UseModalDisclosureProps = {}
): UseModalDisclosureReturn => {
  const { onClose, onOpen } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const handleOpen = React.useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  return {
    isOpen,
    handleClose,
    handleOpen,
  };
};
