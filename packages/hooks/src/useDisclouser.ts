import React from "react";

interface useDisclouserProps {
  onClose?: () => any;
  onOpen?: () => any;
}

interface useDisclouserReturn {
  isOpen: boolean;
  handleOpen: () => any;
  handleClose: () => any;
}

export const useDisclouser = (
  props: useDisclouserProps = {
    onClose: () => {},
    onOpen: () => {},
  }
): useDisclouserReturn => {
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
