import React, { FC } from "react";
import { AuthSwitcher } from "@UI";
import { useLoginPopup } from "@UI";
import { FormContainer, Modal, ModalContent, ModalOverlay } from "@UI";

export interface AuthPopupProp {
  onClose?: () => void;
}

export const AuthPopup: FC<AuthPopupProp> = ({ onClose }) => {
  const { popupOpen, CloseLoginPopup, OpenLoginPopup } = useLoginPopup();
  const [showSwitcher, setShowSwitcher] = React.useState<boolean>(true);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    CloseLoginPopup();
  };

  function handleOpen() {
    OpenLoginPopup();
  }
  React.useEffect(() => {
    if (popupOpen) {
      setShowSwitcher(true);
    } else {
      setTimeout(() => {
        setShowSwitcher(false);
      }, 300);
    }
  }, [popupOpen]);

  return (
    <>
      <Modal onClose={CloseLoginPopup} isOpen={popupOpen} onOpen={handleOpen}>
        <ModalOverlay />
        <ModalContent>
          <FormContainer>
            <AuthSwitcher loginType="login" />
          </FormContainer>
        </ModalContent>
      </Modal>
    </>
  );
};
