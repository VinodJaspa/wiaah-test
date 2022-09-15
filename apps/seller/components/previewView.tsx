import React from "react";
import {
  Button,
  Modal,
  ModalButton,
  ModalContent,
  ModalExtendedWrapper,
  ModalOverlay,
} from "ui";

export const PreviewView: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <div className="flex w-full h-full justify-center items-center">
      <Button onClick={() => setOpen(true)}>test</Button>
      <Modal onOpen={()=>{}} isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <Button onClick={() => setOpen(false)}>controled</Button>
        </ModalContent>
      </Modal>

      <ModalExtendedWrapper>
        <ModalButton>
          <Button>extended</Button>
        </ModalButton>
        <ModalOverlay />
        <ModalContent>
          <h1>WORKS</h1>
        </ModalContent>
      </ModalExtendedWrapper>
    </div>
  );
};
