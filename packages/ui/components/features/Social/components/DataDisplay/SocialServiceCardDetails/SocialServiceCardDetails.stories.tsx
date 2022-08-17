import { SocialServiceCardDetails } from "./SocialServiceCardDetails";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  randomNum,
  storybookSocialServiceCardsTitle,
  storybookSocialServiceDataDisplayTitle,
} from "utils";

export default {
  title: storybookSocialServiceDataDisplayTitle + "SocialServiceCardDetails",
  component: SocialServiceCardDetails,
} as ComponentMeta<typeof SocialServiceCardDetails>;

const template: ComponentStory<typeof SocialServiceCardDetails> = (args) => (
  <SocialServiceCardDetails {...args} />
);

export const Default = template.bind({});
Default.args = {
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
};
