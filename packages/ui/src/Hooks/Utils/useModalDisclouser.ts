import React from "react";

interface useModalDisclouserProps {
  onClose?: () => any;
  onOpen?: () => any;
}

interface useModalDisclouserReturn {
  isOpen: boolean;
  handleOpen: () => any;
  handleClose: () => any;
}

export const useModalDisclouser = (
  props: useModalDisclouserProps
): useModalDisclouserReturn => {
  const { onClose, onOpen } = props;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  function handleClose() {
    setIsOpen(false);
    onClose && onClose();
  }

  function handleOpen() {
    setIsOpen(true);
    onOpen && onOpen();
  }

  return {
    isOpen,
    handleClose,
    handleOpen,
  };
};
