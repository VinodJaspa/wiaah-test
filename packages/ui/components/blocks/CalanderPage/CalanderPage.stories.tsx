import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { CalanderPage } from "../";

export default {
  title: "UI/blocks/CalanderPage",
  component: CalanderPage,
} as Meta<typeof CalanderPage>;

export const Default = {
  args: {
    date: Date.now(),
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center bg-white">
          <Story {...args} />
        </section>
      );
    },
  ],
};
