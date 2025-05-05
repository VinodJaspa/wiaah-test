import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { HorizontalCollaboration } from "@UI";
import { storybookBlocksTitle } from "utils";
export default {
  title: "UI / blocks / HorizontalCollaboration",
  component: HorizontalCollaboration,
} as Meta<typeof HorizontalCollaboration>;

export const Default = {
  args: {},

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full flex-col items-center justify-center bg-slate-200">
        <Story args={args} />
      </section>
    ),
  ],
};
