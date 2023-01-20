import React from "react";
import {
  SocialStoryViewer,
  SocialStoryViewerProps,
} from "../SocialStoryViewer";
import { Modal, ModalOverlay, ModalContent, useProgressBars } from "@partials";
import { SocialStoryDataWithUser } from "types";
import { useTypedReactPubsub } from "@libs";
import { useGetPrevStory, useGetProfileStory } from "@features/Social";

export const useStoryModal = () => {
  const { Listen, emit, removeListner } = useTypedReactPubsub(
    (k) => k.openSocialStoryModal
  );
  const { update } = useProgressBars();

  React.useEffect(() => removeListner, []);

  function open(userId: string) {
    emit({ userId });
  }

  function close() {
    emit({ userId: null });
  }

  return {
    open,
    close,
    Listen,
    updateProgressBars: update,
  };
};

export interface SocialStoriesModalProps {
  profileId: string;
}

export const SocialStoryModal: React.FC<SocialStoriesModalProps> = ({
  profileId,
}) => {
  const [story, setStory] = React.useState<SocialStoryDataWithUser>();
  const { close } = useStoryModal();

  const { refetch } = useGetProfileStory(profileId, {
    onSuccess(data) {
      setStory(data);
    },
  });
  useGetPrevStory(story?.id, {
    onSuccess(data) {
      setStory(data);
    },
    enabled: !!story?.id,
  });

  function handleNext() {
    refetch();
  }

  function handlePrev() {}

  return (
    <>
      <Modal onClose={close} isOpen={!!profileId}>
        <ModalOverlay />
        <ModalContent className="bg-[#000] max-h-[80vh] text-white">
          {story ? (
            <SocialStoryViewer
              next={() => {}}
              prev={() => {}}
              story={story}
              user={story.user}
            />
          ) : null}
        </ModalContent>
      </Modal>
    </>
  );
};
