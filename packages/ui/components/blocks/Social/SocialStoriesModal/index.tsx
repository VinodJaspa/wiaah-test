import React from "react";
import {
  SocialStoryViewer,
  SocialStoryViewerProps,
} from "../SocialStoryViewer";
import { Modal, ModalOverlay, ModalContent, useProgressBars } from "@partials";
import { SocialStoryDataWithUser } from "types";
import { useTypedReactPubsub } from "@libs";

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

export interface SocialStoriesModalProps
  extends Omit<SocialStoryViewerProps, "story"> {
  story: SocialStoryDataWithUser | null;
}

export const SocialStoryModal: React.FC<SocialStoriesModalProps> = ({
  story: _story,
  ...props
}) => {
  const [story, setStory] = React.useState<SocialStoryDataWithUser>();
  const { close } = useStoryModal();

  if (_story && _story.id !== story?.id) {
    setStory(_story);
  }

  return (
    <>
      <Modal onClose={close} isOpen={!!_story}>
        <ModalOverlay />
        <ModalContent className="bg-[#000] max-h-[80vh] text-white">
          {story ? (
            <SocialStoryViewer {...props} story={story} user={story.user} />
          ) : null}
        </ModalContent>
      </Modal>
    </>
  );
};
