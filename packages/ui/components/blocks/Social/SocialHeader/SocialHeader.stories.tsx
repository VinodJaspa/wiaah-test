import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SocialHeader } from "@UI";
export default {
  title: "UI/blocks/Social/SocialHeader",
  component: SocialHeader,
} as ComponentMeta<typeof SocialHeader>;

const Template: ComponentStory<typeof SocialHeader> = (args) => (
  <div className="w-full">
    <SocialHeader {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
