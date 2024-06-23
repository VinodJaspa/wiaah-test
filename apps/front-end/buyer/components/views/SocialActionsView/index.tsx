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
    id: "5",
    likes: 232,
    dislikes: 45,
    comments: 45,
    shares: 15,
    title: "Lorem ipsum dolor",
    storyType: "video",
    url: "/verticalVideo.mp4",
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyViews: 1300000,
    storySrc: "/verticalVideo.mp4",
    user: SocialProfileInfo,
  },
  {
    id: "3",
    likes: 232,
    dislikes: 45,
    comments: 45,
    shares: 15,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    storyType: "image",
    url: "/verticalImage.jpg",
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyViews: 12300,
    storySrc: "/verticalImage.jpg",
    user: SocialProfileInfo,
  },
  {
    id: "2",
    likes: 232,
    dislikes: 45,
    comments: 45,
    shares: 15,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    storyType: "image",
    url: "/shop-2.jpeg",
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyViews: 1900,
    storySrc: "/shop-2.jpeg",
    user: SocialProfileInfo,
    storyText: "image story with text",
  },
  {
    id: "3",
    likes: 232,
    dislikes: 45,
    comments: 45,
    shares: 15,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    storyType: "image",
    url: "/verticalImage.jpg",
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyViews: 12300,
    storySrc: "/verticalImage.jpg",
    user: SocialProfileInfo,
  },
  {
    id: "4",
    likes: 232,
    dislikes: 45,
    comments: 45,
    shares: 15,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    storyType: "video",
    url: "/video.mp4",
    storyCreationDate: new Date(Date.UTC(2022, 3, 1)).toISOString(),
    storyViews: 500,
    storySrc: "/video.mp4",
    user: SocialProfileInfo,
    storyText: "video story with Text",
  },
];
