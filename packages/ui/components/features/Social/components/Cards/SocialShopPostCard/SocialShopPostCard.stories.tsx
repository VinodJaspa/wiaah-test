import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SocialShopPostcard } from "./SocialShopPostCard";
import { storybookSocialShopPostCardsTitle } from "utils";
import { PostCardPlaceHolder } from "placeholder";

export default {
  title: storybookSocialShopPostCardsTitle + "SocialShopPostCard",
  component: SocialShopPostcard,
} as ComponentMeta<typeof SocialShopPostcard>;

const template: ComponentStory<typeof SocialShopPostcard> = (args) => (
  <div className="w-[30rem] h-[30rem]">
    <SocialShopPostcard {...args} />
  </div>
);

export const Default = template.bind({});
Default.args = {
  ...PostCardPlaceHolder,

  discount: 15,
  cashback: 5,
  price: 25,
};
