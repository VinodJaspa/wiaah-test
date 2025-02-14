import {
  AttachmentType,
  NewsfeedPost,
  ProductPost,
  Profile,
  ProfileReachedGender,
  ProfileVisibility,
  ServicePost,
  Story,
  StoryType,
} from "@features/API";
import { useTypedReactPubsub } from "@libs";
import { Modal, ModalContent, ModalOverlay } from "@partials";
import { Maybe } from "graphql/jsutils/Maybe";
import React from "react";
import { SocialStoryViewer } from "../SocialStoryViewer";

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
    setUserId(id);
    emit({ id });
  }

  function CloseModal() {
    setUserId(undefined); // Reset state to undefined
    emit({ id: undefined }); // Emit an event with no ID to signal closure
  }

  return {
    userId,
    setUserId,
    OpenModal,
    CloseModal,
    Listen,
  };
};

export type SocialStoryFields = Pick<
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
  newsfeedPost?: Pick<NewsfeedPost, "id">;
  servicePost?: Pick<ServicePost, "id">;
  shopPost?: Pick<ProductPost, "id">;
};

// Define a type for Profile fields
export type SocialStoryPublisher = Maybe<
  { __typename?: "Profile" } & Pick<
    Profile,
    "photo" | "username" | "visibility" | "id"
  >
>;

// Define the main SocialStoryType
export type SocialStoryType = {
  stories: Array<SocialStoryFields>;
  publisher?: SocialStoryPublisher;
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

  function handlePrev() {}

  return (
    <>
      <Modal onClose={CloseModal} isOpen={!!userId}>
        <ModalOverlay />
        <ModalContent className="bg-[#000] h-[80vh] xl:w-1/4 lg:w-1/3 md:w-1/2 w-full text-white px-0 py-4 overflow-hidden">
          {story ? (
            <SocialStoryViewer
              onClose={CloseModal}
              id={userId}
              stories={story}
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
  stories: [
    {
      id: "story123",
      content: "This is a sample story content.",
      createdAt: new Date().toISOString(),
      publisherId: "publisher456",
      reactionsNum: 42,
      type: StoryType.Image,
      attachements: {
        src: "https://images.pexels.com/photos/30244799/pexels-photo-30244799/free-photo-of-vibrant-portrait-in-dramatic-red-and-blue-lighting.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        marketingTags: [],
        type: AttachmentType.Img,
      },
      newsfeedPost: {
        id: "1",
      },
      updatedAt: new Date().toISOString(),
      viewsCount: 123,
      views: [
        {
          __typename: "StoryView",
          createdAt: new Date().toISOString(),
          gender: ProfileReachedGender.Male,
          id: "storyView123",
          storyId: "story456",
          viewerId: "viewer789",
        },
      ],
    },
    {
      id: "story123",
      content: "This is a sample story content.",
      createdAt: new Date().toISOString(),
      publisherId: "publisher456",
      reactionsNum: 42,
      type: StoryType.Video,
      attachements: {
        src: "/action.mp4",
        marketingTags: [],
        type: AttachmentType.Vid,
      },
      servicePost: {
        id: "1",
      },
      updatedAt: new Date().toISOString(),
      viewsCount: 123,
      views: [
        {
          __typename: "StoryView",
          createdAt: new Date().toISOString(),
          gender: ProfileReachedGender.Male,
          id: "storyView123",
          storyId: "story456",
          viewerId: "viewer789",
        },
      ],
    },
    {
      id: "story124",
      content: "This is a sample story.",
      createdAt: new Date().toISOString(),
      publisherId: "publisher456",
      reactionsNum: 42,
      type: StoryType.Product,
      shopPost: {
        id: "1",
      },
      updatedAt: new Date().toISOString(),
      viewsCount: 123,
      views: [
        {
          __typename: "StoryView",
          createdAt: new Date().toISOString(),
          gender: ProfileReachedGender.Male,
          id: "storyView123",
          storyId: "story456",
          viewerId: "viewer789",
        },
      ],
    },
  ],
  publisher: {
    photo: "/shop-2.jpeg",
    username: "sampleUser",
    visibility: ProfileVisibility.Public,
    id: "profile123",
  },
};
