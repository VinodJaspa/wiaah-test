import React from "react";
import { SocialActionData, SocialStoryDataWithUser } from "types";
import { useTranslation } from "react-i18next";
import { Slider, AspectRatio } from "ui";
import { SocialProfileInfo } from "placeholder";
import { ActionViewer, PostViewPopup } from "ui";
export const ActionsView: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white w-full h-[40rem] overflow-hidden flex-col flex items-center">
      <p className="text-4xl font-bold">{t("Action")}</p>
      {/* actions View */}
      <AspectRatio ratio={16 / 5}>
        <Slider variant="vertical">
          {actionsPlaceholders.map((action, i) => (
            <ActionViewer action={action} key={i} />
          ))}
        </Slider>
      </AspectRatio>
    </div>
  );
};

const actionsPlaceholders: SocialActionData[] = [
  {
    id: "1",
    likes: 100,
    dislikes: 20,
    comments: 50,
    shares: 30,
    title: "Sample Story Title",
    storyType: "video",
    url: "https://example.com/video",
    storyCreationDate: "2024-07-02",
    storyViews: 500,
    storySrc: "https://example.com/video.mp4",
    user: SocialProfileInfo,
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
    url: "https://example.com/video",
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
    url: "https://example.com/video",
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
    url: "https://example.com/video",
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
    url: "https://example.com/video",
    id: "4",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];
