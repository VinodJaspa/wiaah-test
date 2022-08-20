import { SocialServicePostAttachment } from "./SocialServicePostAttachments";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookSocialServiceDataDisplayTitle } from "utils";

export default {
  title:
    storybookSocialServiceDataDisplayTitle + "SocialServicePostAttachments",
  component: SocialServicePostAttachment,
} as ComponentMeta<typeof SocialServicePostAttachment>;

const template: ComponentStory<typeof SocialServicePostAttachment> = (args) => (
  <SocialServicePostAttachment {...args} />
);

export const Default = template.bind({});
Default.args = {
  cashback: {
    amount: 15,
    type: "percent",
  },
  discount: randomNum(13),
  src: "/shop-2.jpeg",
  type: "image",
  alt: "service",
};
