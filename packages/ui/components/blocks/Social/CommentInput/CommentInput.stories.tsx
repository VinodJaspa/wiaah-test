import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CommentInput } from "@UI";
export default {
  title: "UI/blocks/Social/CommentInput",
  component: CommentInput,
} as ComponentMeta<typeof CommentInput>;

const Template: ComponentStory<typeof CommentInput> = (args) => (
  <CommentInput {...args} />
);

export const Default = Template.bind({});
Default.args = {};
