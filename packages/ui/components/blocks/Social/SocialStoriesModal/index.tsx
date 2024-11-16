import React from "react";
import { SocialStoryViewer } from "../SocialStoryViewer";
import { Modal, ModalOverlay, ModalContent, useProgressBars } from "@partials";
import { useTypedReactPubsub } from "@libs";
import { useGetPrevStory, useGetUserStory } from "@features/Social";
import {
  AttachmentType,
  Profile,
  ProfileReachedGender,
  ProfileVisibility,
  Story,
  StoryType,
} from "@features/API";
import { Maybe } from "graphql/jsutils/Maybe";

export const useStoryModal = () => {
  const { Listen, emit, removeListner } = useTypedReactPubsub(
    (events) => events.openSocialStoryViewersModal,
  );
  const [userId, setUserId] = React.useState<string>();

  React.useEffect(() => {
    const listener = (props?: { id?: string }) => {
      if (props?.id) {
        setUserId(props.id);
      } else {
        setUserId(undefined);
      }
    };
    Listen(listener);

    return removeListner;
  }, [Listen, removeListner]);

  function OpenModal(id: string) {
    emit({ id });
    setUserId(id);
  }

  function CloseModal() {
    setUserId(undefined);
  }

  return {
    userId,
    setUserId,
    OpenModal,
    CloseModal,
    Listen,
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
  profileId?: string;
}

export const SocialStoryModal: React.FC<SocialStoriesModalProps> = ({
  storyData,
  profileId,
}) => {
  const [story, setStory] = React.useState<SocialStoryType>(FAKE_STORY);
  const { CloseModal, userId } = useStoryModal();

  // const { refetch } = useGetUserStory(profileId, {
  //   onSuccess(data) {
  //     setStory({ ...data, views: [], publisher: data.publisher as Profile });
  //   },
  //   enabled: !!profileId,
  // });
  // useGetPrevStory(story?.id!, {
  //   onSuccess(data) {
  //     setStory({ ...data, views: [] });
  //   },
  //   enabled: !!story?.id,
  // });

  // function handleNext() {
  //   refetch();
  // }

  function handlePrev() { }

  return (
    <>
      <Modal onClose={CloseModal} isOpen={!!userId}>
        <ModalOverlay />
        <ModalContent className="bg-[#000] max-h-[80vh] h-5/6 w-1/3 text-white">
          {story ? (
            <SocialStoryViewer
              next={() => { }}
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

const FAKE_STORY: SocialStoryType = {
  id: "story123",
  content: "This is a sample story content.",
  createdAt: new Date().toISOString(),
  publisherId: "publisher456",
  reactionsNum: 42,
  type: StoryType.Affiliation, // assuming `type` is a string representing the type of story, e.g., "text", "image", etc.
  updatedAt: new Date().toISOString(),
  viewsCount: 123,
  views: [
    {
      __typename: "StoryView",
      createdAt: new Date().toISOString(), // Replace with appropriate Date format if necessary
      gender: ProfileReachedGender.Male, // Assuming `ProfileReachedGender` is an enum with values like "male", "female", etc.
      id: "storyView123",
      storyId: "story456",
      viewerId: "viewer789",
    },
  ], // Adjust structure if needed
  publisher: {
    __typename: "Profile",
    photo: "https://via.placeholder.com/50",
    username: "sampleUser",
    visibility: ProfileVisibility.Public, // assuming "public" or similar values for visibility
    id: "profile123",
  },
};
