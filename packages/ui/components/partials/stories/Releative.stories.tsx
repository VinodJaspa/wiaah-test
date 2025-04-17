import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Releative } from "../";
export default {
  title: "UI/partials/Releative",
  component: Releative,
} as Meta<typeof Releative>;

const Template: StoryFn<typeof Releative> = (args) => (
  <Releative {...args}>
    <div className="absolute top-1/4 right-32 h-8 w-8 bg-blue-400"></div>
  </Releative>
);

export const Default = {
  render: Template,

  args: {
    fullWidth: true,
    fullHeight: true,
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args} />
      </section>
    ),
  ],
};
