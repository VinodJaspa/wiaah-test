import React from "react";
import { SocialStoryViewer } from "../SocialStoryViewer";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useProgressBars,
} from "../../../partials";
import { useTypedReactPubsub } from "../../../../libs";
import { useGetPrevStory, useGetUserStory } from "../../../features/Social";
import { Profile, Story } from "../../../features/API";
import { Maybe } from "graphql/jsutils/Maybe";

export const useStoryModal = () => {
  const { Listen, emit, removeListner } = useTypedReactPubsub(
    (k) => k.openSocialStoryModal,
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

export type SocialStoryType = Pick<
  Story,
  | "id"
  | "content"
  | "createdAt"
  | "publisherId"
  | "reactionsNum"
  | "type"
  | "updatedAt"
  | "viewsCount"
  | "views"
  | "attachements"
> & {
  publisher?: Maybe<
    { __typename?: "Profile" } & Pick<
      Profile,
      "photo" | "username" | "visibility" | "id"
    >
  >;
};

export interface SocialStoriesModalProps {
  storyData?: SocialStoryType;
  profileId: string;
}

export const SocialStoryModal: React.FC<SocialStoriesModalProps> = ({
  profileId,
  storyData,
}) => {
  const [story, setStory] = React.useState<SocialStoryType>(storyData);
  const { close } = useStoryModal();

  const { refetch } = useGetUserStory(profileId, {
    onSuccess(data) {
      setStory({ ...data, views: [], publisher: data.publisher as Profile });
    },
    enabled: !!profileId,
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

  function handlePrev() { }

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
