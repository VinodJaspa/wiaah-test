import { NextPage } from "next";
import React from "react";
import {
  Button,
  Modal,
  ModalButton,
  ModalContent,
  ModalExtendedWrapper,
  ModalOverlay,
} from "ui";

const ModalTest = ({ close, open }: { close?: any; open?: any }) => {
  return (
    <Modal isOpen={open || false} onClose={() => close && close()}>
      <ModalOverlay />
      <ModalContent>
        <Button onClick={() => close && close()}>controled</Button>
      </ModalContent>
    </Modal>
  );
};

const preview: NextPage = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <div className="flex w-full h-full justify-center items-center">
      <Button onClick={() => setOpen(true)}>test</Button>
      <ModalTest close={() => setOpen(false)} open={open} />

      <ModalExtendedWrapper>
        <ModalButton>
          <Button>extended</Button>
        </ModalButton>
        <ModalTest />
      </ModalExtendedWrapper>
    </div>
  );
};

export default preview;
