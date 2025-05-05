import { SocialServicePostAttachment } from "./SocialServicePostAttachments";
import { Meta, StoryFn } from "@storybook/react";
import { randomNum, storybookSocialServiceDataDisplayTitle } from "utils";

export default {
  title:
    "UI / Features /Social /Data Display /services /SocialServicePostAttachments",
  component: SocialServicePostAttachment,
} as Meta<typeof SocialServicePostAttachment>;

export const Default = {
  args: {
    cashback: {
      amount: 15,
      type: "percent",
    },
    discount: randomNum(13),
    src: "/shop-2.jpeg",
    type: "image",
    alt: "service",
  },
};
