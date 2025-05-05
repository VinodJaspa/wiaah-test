import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ItemsTable } from "@UI";
import { storybookBlocksTitle } from "utils";

export default {
  title: "UI / blocks / ItemsTable",
  component: ItemsTable,
} as Meta<typeof ItemsTable>;

export const Default = {
  args: {
    items: [
      { name: "Dress" },
      { name: "Home" },
      { name: "Jewelry" },
      { name: "Clothing" },
    ],
    title: "Types of Shop",
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
