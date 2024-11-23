import React from "react";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  FormContainer,
  AuthSwitcher,
} from "@UI";
import { useTypedReactPubsub } from "@libs";

export const useAuthenticationModal = () => {
  const { Listen, emit, removeListner } = useTypedReactPubsub(
    (events) => events.openAuthenticationModal,
  );

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleEvent = (open: boolean) => {
      setIsOpen(open);
    };

    // Listen for authentication modal events
    Listen(handleEvent);

    // Cleanup listener on unmount
    return removeListner;
  }, [Listen, removeListner]);

  const openModal = () => {
    console.log("Open Modal clicked" + isOpen);
    setIsOpen(true);
    emit(true); // Emit an event signaling the modal should open
  };

  const closeModal = () => {
    setIsOpen(false);
    emit(false); // Emit an event signaling the modal should close
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export const AuthenticationModal: React.FC<{}> = () => {
  const { isOpen, closeModal } = useAuthenticationModal();
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <FormContainer>
          <AuthSwitcher loginType="login" />
        </FormContainer>
      </ModalContent>
    </Modal>
  );
};
