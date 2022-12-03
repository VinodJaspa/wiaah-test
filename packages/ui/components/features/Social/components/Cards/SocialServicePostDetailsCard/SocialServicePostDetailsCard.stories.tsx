import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookSocialServiceCardsTitle } from "utils";
import { SocialServicePostDetailsCard } from "./SocialServicePostDetailsCard";

export default {
  title: storybookSocialServiceCardsTitle + "SocialServicePostDetailsCard",
  component: SocialServicePostDetailsCard,
} as ComponentMeta<typeof SocialServicePostDetailsCard>;

const template: ComponentStory<typeof SocialServicePostDetailsCard> = (
  args
) => <SocialServicePostDetailsCard {...args} />;

export const Default = template.bind({});
Default.args = {
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
};
