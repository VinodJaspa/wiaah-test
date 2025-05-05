import { Meta, StoryFn } from "@storybook/react";
import { randomNum, storybookSocialServiceCardsTitle } from "utils";
import { SocialServicePostDetailsCard } from "./SocialServicePostDetailsCard";

export default {
  title: "UI / Features /Social /Cards /services /SocialServicePostDetailsCard",
  component: SocialServicePostDetailsCard,
} as Meta<typeof SocialServicePostDetailsCard>;

export const Default = {
  args: {
    content: "random service post content",
    hashtags: ["fashion", "gaming"],
    id: "123",
    label: "restaurant",
    name: "service name",
    postInteraction: {
      comments: 15,
      likes: 30,
    },
    attachements: [
      {
        src: "/shop.jpeg",
        type: "image",
      },
      {
        src: "/video.mp4",
        type: "video",
      },
    ],
    type: "image",
    user: {
      accountType: "buyer",
      id: "132",
      name: "username",
      public: true,
      thumbnail: "/shop.jpeg",
      verified: true,
    },
  },
};
