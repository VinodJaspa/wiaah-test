import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { useStory } from "ui/Hooks";
import { SocialStoryViewer } from "ui";
import { SocialStoryState, SocialStoriesState } from "ui/state";

export interface SocialStoriesModalProps {}

export const SocialStoriesModal: React.FC<SocialStoriesModalProps> = () => {
  const stories = useRecoilValue(SocialStoriesState);
  const { storiesOpen, CloseStories } = useStory();
  const storyData = useRecoilValue(SocialStoryState);
  return (
    <>
      <Modal
        isCentered
        onClose={CloseStories}
        isOpen={storiesOpen}
        motionPreset="slideInBottom"
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent shadow={"none"} color="white" bg="transparent">
          <ModalBody shadow={"none"} p={"0px"}>
            {storyData && (
              <SocialStoryViewer stories={stories} user={storyData.user} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
