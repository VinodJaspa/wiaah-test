import { ModalContent, ModalOverlay } from "@chakra-ui/react";
import { getRandomName, Modal, StoryViewer, useNewWithdrawalModal } from "@UI";
import { getRandomImage } from "placeholder";
import React from "react";

export const StoryModal = () => {
  const { isOpen, onClose, onOpen } = useNewWithdrawalModal();
  return (
    <Modal isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <ModalOverlay />
      <ModalContent>
        <StoryViewer
          story={{
            content:
              "Lorem Ipsum is simply dummy text of the printing and typesetting",
            createdAt: new Date().toUTCString(),
            id: "",
            src: getRandomImage(),
            type: "img",
          }}
          user={{
            id: "",
            photo: getRandomImage(),
            username: getRandomName().firstName,
          }}
          onClose={() => { }}
          onNext={() => { }}
          onPrev={() => { }}
          totalStoryCount={3}
          currentStory={0}
        />
      </ModalContent>
    </Modal>
  );
};
