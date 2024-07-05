import React from "react";
import { SocialActionData, SocialStoryDataWithUser } from "types";
import { useTranslation } from "react-i18next";
import { Slider, AspectRatio } from "ui";
import { SocialProfileInfo } from "placeholder";
import { ActionViewer, PostViewPopup } from "ui";
export const SocialActionsView: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white w-full h-[40rem] overflow-hidden flex-col flex items-center justyf-center">
      <PostViewPopup
        fetcher={async ({ queryKey }) => {
          const id = queryKey[1].postId;
          const action = actionsPlaceholders.find((post) => post.id === id);
          return action ? action : null;
        }}
        queryName="action"
        idParam="actionId"
        renderChild={(props: SocialActionData) => {
          return <ActionViewer action={props} />;
        }}
      />
      {/* actions View */}
      <Slider variant="vertical">
        {actionsPlaceholders.map((action, i) => (
          <ActionViewer key={i} action={action} />
        ))}
      </Slider>
    </div>
  );
};

const actionsPlaceholders: SocialActionData[] = [
  {
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyType: "video",
    storyViews: 1300000,
    storySrc: "/verticalVideo.mp4",
    id: "5",
    user: SocialProfileInfo,
    comments: 45,
    dislikes: 45,
    likes: 232,
    shares: 15,
    title: "Lorem ipsum dolor",
    url: "https:/fakeurl",
  },
  {
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyType: "image",
    storyViews: 12300,
    storySrc: "/verticalImage.jpg",
    user: SocialProfileInfo,
    comments: 45,
    dislikes: 45,
    likes: 232,
    shares: 15,
    id: "3",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    url: "https:/fakeurl",
  },
  {
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyType: "image",
    storyViews: 1900,
    storySrc: "/shop-2.jpeg",
    id: "2",
    storyText: "image story with text",
    user: SocialProfileInfo,
    comments: 45,
    dislikes: 45,
    likes: 232,
    shares: 15,
    url: "https:/fakeurl",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyType: "image",
    storyViews: 12300,
    storySrc: "/verticalImage.jpg",
    user: SocialProfileInfo,
    comments: 45,
    dislikes: 45,
    likes: 232,
    shares: 15,
    id: "3",
    url: "https:/fakeurl",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyType: "video",
    storyViews: 500,
    storySrc: "/video.mp4",
    storyText: "video story with Text",
    user: SocialProfileInfo,
    comments: 45,
    dislikes: 45,
    likes: 232,
    shares: 15,
    id: "4",
    url: "https:/fakeurl",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];
