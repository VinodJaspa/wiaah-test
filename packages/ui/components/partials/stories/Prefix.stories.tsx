import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Prefix } from "../";
export default {
  title: "UI/partials/Prefix",
  component: Prefix,
} as Meta<typeof Prefix>;

export const Default = {
  args: {
    prefix: <div className="h-4 w-4 bg-cyan-300"></div>,
    children: "<--- Prefix",
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args} />
      </section>
    ),
  ],
};
