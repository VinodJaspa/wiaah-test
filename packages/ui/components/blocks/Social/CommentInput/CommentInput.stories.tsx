import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CommentInput } from "ui";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/blocks/Social/CommentInput",
  component: CommentInput,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof CommentInput>;

const Template: ComponentStory<typeof CommentInput> = (args) => (
  <CommentInput {...args} />
);

export const Default = Template.bind({});
Default.args = {};
