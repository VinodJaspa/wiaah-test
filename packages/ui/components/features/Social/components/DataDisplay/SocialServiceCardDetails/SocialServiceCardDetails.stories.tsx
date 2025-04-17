import { SocialServiceCardDetails } from "./SocialServiceCardDetails";
import { Meta, StoryFn } from "@storybook/react";
import {
  randomNum,
  storybookSocialServiceCardsTitle,
  storybookSocialServiceDataDisplayTitle,
} from "utils";

export default {
  title:
    "UI / Features /Social /Data Display /services /SocialServiceCardDetails",
  component: SocialServiceCardDetails,
} as Meta<typeof SocialServiceCardDetails>;

export const Default = {
  args: {
    title: "service title",
    price: randomNum(150),
    rating: randomNum(5),
    views: randomNum(135),
    user: {
      accountType: "seller",
      id: "132",
      name: "username",
      public: true,
      thumbnail: "/shop-2.jpeg",
      verifed: true,
    },
  },
};
