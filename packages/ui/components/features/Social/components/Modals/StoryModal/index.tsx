import { useTypedReactPubsub } from "@libs";
import { Modal, StoryViewer, ModalOverlay, ModalContent } from "@UI";
import React from "react";
import {
  EyeIcon,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  PaperPlaneAngleIcon,
  SmilingFaceFillEmoji,
} from "@partials";
import { useTranslation } from "react-i18next";

export const useShowStoryModal = () => {
  const { Listen, emit, removeListner } = useTypedReactPubsub(
    (events) => events.showStoryModal,
  );
  const [id, setId] = React.useState<string>();

  React.useEffect(() => {
    const listener = (props?: { id?: string }) => {
      if (props?.id) {
        setId(props.id);
      } else {
        setId(undefined);
      }
    };
    Listen(listener);

    return removeListner;
  }, [Listen, removeListner]);

  function OpenModal(id: string) {
    emit({ id });
    setId(id);
  }

  function CloseModal() {
    setId(undefined);
  }

  return {
    id,
    setId,
    OpenModal,
    CloseModal,
  };
};

export const ShowStoryModal = () => {
  const { t } = useTranslation();
  const { id, setId, CloseModal } = useShowStoryModal();

  return (
    <Modal isOpen={!!id} onClose={CloseModal} onOpen={() => { }}>
      <ModalOverlay />
      <ModalContent className="w-1/3 h-4/5 p-0">
        <div className="h-[93%]">
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
            onClose={CloseModal}
            onNext={() => { }}
            onPrev={() => { }}
            totalStoryCount={3}
            currentStory={0}
          />
        </div>
        {false ? (
          <HStack className=" w-full px-3 py-1 rounded-full self-center border text-white border-white">
            <EyeIcon className="text-lg" />
            <p>{t("Views")}</p>
          </HStack>
        ) : (
          <HStack className="w-full self-end gap-6 bg-black">
            <InputGroup className="w-full rounded-full px-2 pr-4">
              <Input
                className="bg-black placeholder:text-white"
                placeholder={t("Write a message....")}
              />

              <InputRightElement>
                <SmilingFaceFillEmoji className="text-white text-xl" />
              </InputRightElement>
            </InputGroup>
            <PaperPlaneAngleIcon className="text-3xl text-white cursor-pointer" />
          </HStack>
        )}
      </ModalContent>
    </Modal>
  );
};
