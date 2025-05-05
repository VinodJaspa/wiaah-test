import { Meta, StoryFn } from "@storybook/react";
import { SocialShopPostcard } from "./SocialShopPostCard";
import { storybookSocialShopPostCardsTitle } from "utils";
import { PostCardPlaceHolder } from "placeholder";

export default {
  title: "UI / Features /Social /Cards /shop /SocialShopPostCard",
  component: SocialShopPostcard,
} as Meta<typeof SocialShopPostcard>;

const template: StoryFn<typeof SocialShopPostcard> = (args) => (
  <div className="w-[30rem] h-[30rem]">
    <SocialShopPostcard {...args} />
  </div>
);

export const Default = {
  render: template,

  args: {
    ...PostCardPlaceHolder,

    discount: 15,
    cashback: 5,
    price: 25,
  },
};
