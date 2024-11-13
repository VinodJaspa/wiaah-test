import { useTypedReactPubsub } from "@libs";
import { Modal, StoryViewer, ModalOverlay, ModalContent } from "@UI";
import React from "react";

export const useShowStoryModal = () => {
  const { Listen, emit, removeListner } = useTypedReactPubsub(
    (events) => events.showStoryModal,
  );

  function OpenModal(id: string) {
    emit({ id });
  }
  function CloseModal() {
    emit();
  }
  return {
    OpenModal,
    CloseModal,
    Listen,
    removeListner,
  };
};

export const ShowStoryModal = () => {
  const { Listen, removeListner } = useShowStoryModal();
  const [id, setId] = React.useState<string>();

  function handleclose() {
    setId(undefined);
  }

  Listen((props) => {
    if (props) {
      if ("id" in props) {
        setId(props.id);
      } else {
        handleclose();
      }
    }
  });

  React.useEffect(() => {
    return removeListner;
  }, []);

  return (
    <Modal isOpen={!!id} onClose={handleclose} onOpen={() => { }}>
      <ModalOverlay />
      <ModalContent className="w-1/3 h-4/5 p-0">
        <StoryViewer
          story={{
            content:
              "Lorem Ipsum is simply dummy text of the printing and typesetting",
            createdAt: new Date().toUTCString(),
            id: "",
            src: "/shop.jpeg",
            type: "img",
          }}
          user={{
            id: "",
            photo: "/shop.jpeg",
            username: "name",
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
