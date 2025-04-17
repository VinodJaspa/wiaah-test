import { SocialServicePostCard } from "./SocialServiceCard";
import { storybookSocialServiceCardsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "UI / Features /Social /Cards /services /SocialServiceCard",
  component: SocialServicePostCard,
} as Meta<typeof SocialServicePostCard>;

export const Default = {
  args: {
    id: "123",
    label: "Restaurant",
    name: "Service name",
    attachements: [
      {
        src: "/shop-2.jpeg",
        type: "image",
      },
      {
        src: "/video.mp4",
        type: "video",
      },
    ],
    content: "test content",
    hashtags: ["fashion", "gaming"],
    postInteraction: {
      comments: 13,
      likes: 135,
    },
    user: {
      accountType: "seller",
      id: "123",
      name: "post publisher name",
      public: true,
      thumbnail: "/shop-2.jpeg",
      verified: true,
    },
  },
};
