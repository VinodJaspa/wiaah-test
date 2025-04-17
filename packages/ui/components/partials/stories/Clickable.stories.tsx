import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Clickable } from "../";
export default {
  title: "UI/partials/Clickable",
  component: Clickable,
} as Meta<typeof Clickable>;

const Template: StoryFn<typeof Clickable> = (args) => (
  <Clickable {...args}>
    <div className="h-8 w-8 bg-blue-400"></div>
  </Clickable>
);

export const Default = {
  render: Template,
  args: {},

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args} />
      </section>
    ),
  ],
};
