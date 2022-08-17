import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookSocialServiceCardsTitle } from "utils";
import { SocialServiceDetailsCard } from "./SocialServiceDetailsCard";

export default {
  title: storybookSocialServiceCardsTitle + "SocialServiceDetailsCard",
  component: SocialServiceDetailsCard,
} as ComponentMeta<typeof SocialServiceDetailsCard>;

const template: ComponentStory<typeof SocialServiceDetailsCard> = (args) => (
  <div className="w-96">
    <SocialServiceDetailsCard {...args} />
  </div>
);

export const Default = template.bind({});
Default.args = {
  name: "service name",
  cashback: {
    amount: randomNum(50),
    type: "cash",
  },
  content: "some random post content",
  discount: randomNum(15),
  id: "123",
  hashtags: ["fashion", "gaming"],
  label: "restaurant",
  rate: randomNum(5),
  price: randomNum(321),
  profileInfo: {
    accountType: "seller",
    id: "123",
    name: "user name",
    public: true,
    thumbnail: "/shop-2.jpeg",
    verified: true,
  },
  postInteraction: {
    comments: randomNum(20),
    likes: randomNum(30),
  },
  views: randomNum(3000),
  attachments: [
    { src: "/shop-2.jpeg", type: "image" },
    { src: "/video.mp4", type: "video" },
  ],
};
