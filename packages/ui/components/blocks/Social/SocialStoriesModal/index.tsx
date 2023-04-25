import React from "react";
import { SocialStoryViewer } from "../SocialStoryViewer";
import { Modal, ModalOverlay, ModalContent, useProgressBars } from "@partials";
import { useTypedReactPubsub } from "@libs";
import { useGetPrevStory, useGetProfileStory } from "@features/Social";
import { Profile, Story } from "@features/API";

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
  const [story, setStory] = React.useState<Story>();
  const { close } = useStoryModal();

  const { refetch } = useGetProfileStory(profileId, {
    onSuccess(data) {
      setStory({ ...data, views: [], publisher: data.publisher as Profile });
    },
  });
  useGetPrevStory(story?.id!, {
    onSuccess(data) {
      setStory({ ...data, views: [] });
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
              next={handleNext}
              prev={handlePrev}
              story={story}
              user={{
                name: story.publisher?.username || "",
                thumbnail: story.publisher?.photo || "",
                id: story.publisher?.id || "",
              }}
            />
          ) : null}
        </ModalContent>
      </Modal>
    </>
  );
};
