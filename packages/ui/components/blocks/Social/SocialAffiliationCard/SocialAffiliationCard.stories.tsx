import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SocialAffiliationCard } from "@UI";
import ChakraUiDecorator from "@UI/SBDecorators/ChakraUiDecorator";
import { socialAffiliationCardPlaceholder } from "placeholder";
export default {
  title: "UI/blocks/Social/SocialAffiliationCard",
  component: SocialAffiliationCard,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SocialAffiliationCard>;

const Template: ComponentStory<typeof SocialAffiliationCard> = (args) => (
  <SocialAffiliationCard {...args} />
);

export const WithImage = Template.bind({});
WithImage.args = {
  ...socialAffiliationCardPlaceholder,
  attachment: { src: "/shop.jpeg", type: "image" },
};
export const WithVerticalImage = Template.bind({});
WithVerticalImage.args = {
  ...socialAffiliationCardPlaceholder,
  attachment: { src: "/verticalImage.jpg", type: "image" },
};
export const WithVideo = Template.bind({});
WithVideo.args = {
  ...socialAffiliationCardPlaceholder,
  attachment: {
    src: "/video.mp4",
    type: "video",
  },
};
export const WithVerticalVideo = Template.bind({});
WithVerticalVideo.args = {
  ...socialAffiliationCardPlaceholder,
  attachment: {
    src: "/verticalVideo.mp4",
    type: "video",
  },
};
