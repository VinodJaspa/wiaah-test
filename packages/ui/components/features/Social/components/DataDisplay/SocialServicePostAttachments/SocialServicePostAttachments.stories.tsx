import { SocialServicePostAttachments } from "./SocialServicePostAttachments";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookSocialServiceDataDisplayTitle } from "utils";

export default {
  title:
    storybookSocialServiceDataDisplayTitle + "SocialServicePostAttachments",
  component: SocialServicePostAttachments,
} as ComponentMeta<typeof SocialServicePostAttachments>;

const template: ComponentStory<typeof SocialServicePostAttachments> = (
  args
) => <SocialServicePostAttachments {...args} />;

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
