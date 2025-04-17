import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ScrollableContainer, storybookBlocksTitle } from "@UI";
export default {
  title: "UI / blocks / ScrollableContainer",
  component: ScrollableContainer,
} as Meta<typeof ScrollableContainer>;

const Template: StoryFn<typeof ScrollableContainer> = (args) => (
  <ScrollableContainer {...args}>
    {[...Array(20)].map(() => (
      <div className="h-16 w-16 bg-slate-800"></div>
    ))}
  </ScrollableContainer>
);

export const Default = {
  render: Template,
  args: {},
};

export const WithMaxInitialItems = {
  render: Template,

  args: {
    maxInitialItems: 5,
  },
};
