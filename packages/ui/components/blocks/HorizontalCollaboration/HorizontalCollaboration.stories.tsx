import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HorizontalCollaboration } from "ui";
import { storybookBlocksTitle } from "utils";
export default {
  title: storybookBlocksTitle + "HorizontalCollaboration",
  component: HorizontalCollaboration,
} as ComponentMeta<typeof HorizontalCollaboration>;

const Template: ComponentStory<typeof HorizontalCollaboration> = (args) => (
  <HorizontalCollaboration {...args} />
);

export const Default = Template.bind({});
Default.args = {};

Default.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-slate-200">
      <Story args={args} />
    </section>
  ),
];
