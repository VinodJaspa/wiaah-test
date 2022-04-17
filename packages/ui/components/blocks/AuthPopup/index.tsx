import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  Icon,
  ModalBody,
} from "@chakra-ui/react";
import React, { CSSProperties, FC } from "react";
import { MdClose } from "react-icons/md";
import { AuthSwitcher, SubscribersList } from ".";
import { useLoginPopup } from "../../Hooks";
import { SubscribersUsersPlaceholder } from "../../placeholder/social";
import { FormContainer } from "./FormContainer";

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
