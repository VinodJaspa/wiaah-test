import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SocialProfile } from "ui";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
import { SocialProfileInfo } from "../../../../placeholder/social";
export default {
  title: "UI/blocks/Social/SocialProfile",
  component: SocialProfile,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SocialProfile>;

const Template: ComponentStory<typeof SocialProfile> = (args) => (
  <SocialProfile {...args} />
);

export const Default = Template.bind({});
Default.args = {
  shopInfo: SocialProfileInfo,
};

export const withHighNumbers = Template.bind({});
withHighNumbers.args = {
  shopInfo: {
    ...SocialProfileInfo,
    publications: 1500,
    subscribers: 205600,
    subscriptions: 1300000,
  },
};
