import { SocialServicesPostCard } from "./SocialServicesPostCard";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookSocialServiceCardsTitle } from "utils";
import { PostCardPlaceHolder } from "placeholder";

export default {
  title: storybookSocialServiceCardsTitle + "SocialServicesPostCard",
  component: SocialServicesPostCard,
} as ComponentMeta<typeof SocialServicesPostCard>;

const template: ComponentStory<typeof SocialServicesPostCard> = (args) => (
  <div className="w-[30rem] h-[30rem]">
    <SocialServicesPostCard {...args} />
  </div>
);

export const Default = template.bind({});
Default.args = {
  ...PostCardPlaceHolder,
  postInfo: {
    ...PostCardPlaceHolder.postInfo,
    attachments: [
      {
        type: "image",
        src: "https://cdn2.hubspot.net/hubfs/439788/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg",
      },
    ],
  },
  serviceLabel: "Hotel",
  discount: 15,
  cashback: 5,
  price: 25,
};
