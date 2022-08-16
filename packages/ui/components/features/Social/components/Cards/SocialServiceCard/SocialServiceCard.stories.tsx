import { SocialServicePostCard } from "./SocialServiceCard";
import { storybookSocialServiceCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: storybookSocialServiceCardsTitle + "SocialServiceCard",
  component: SocialServicePostCard,
} as ComponentMeta<typeof SocialServicePostCard>;

const template: ComponentStory<typeof SocialServicePostCard> = (args) => (
  <SocialServicePostCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  id: "123",
  label: "Restaurant",
  name: "Service name",
  thumbnail: "/place-2.jpg",
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
};
