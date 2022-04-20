import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  Icon,
  ModalBody,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { AuthSwitcher } from "ui/components/blocks";
import { useLoginPopup } from "ui/Hooks";
import { FormContainer } from "ui/components/blocks";

interface AuthPopupProp {
  onClose?: () => void;
}

export const AuthPopup: FC<AuthPopupProp> = ({ onClose }) => {
  const { popupOpen, CloseLoginPopup } = useLoginPopup();
  const [showSwitcher, setShowSwitcher] = React.useState<boolean>(true);

  // const handleClose = () => {
  //   if (onClose) {
  //     onClose();
  //   }
  //   CloseLoginPopup();
  // };

  // React.useEffect(() => {
  //   if (popupOpen) {
  //     setShowSwitcher(true);
  //   } else {
  //     setTimeout(() => {
  //       setShowSwitcher(false);
  //     }, 300);
  //   }
  // }, [popupOpen]);

  return (
    <>
      <Modal
        onClose={CloseLoginPopup}
        isCentered
        isOpen={popupOpen}
        motionPreset="slideInBottom"
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody p="0.25rem">
            <FormContainer>
              <AuthSwitcher loginType="login" />
            </FormContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
