import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SocialHeader } from "@UI";
export default {
  title: "UI/blocks/Social/SocialHeader",
  component: SocialHeader,
} as Meta<typeof SocialHeader>;

const Template: StoryFn<typeof SocialHeader> = (args) => (
  <div className="w-full">
    <SocialHeader {...args} />
  </div>
);

export const Default = {
  render: Template,
  args: {},
};
