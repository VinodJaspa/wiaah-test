import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { CollaboratorCard } from "../";

export default {
  title: "UI/blocks/CollaboratorCard",
  component: CollaboratorCard,
} as Meta<typeof CollaboratorCard>;

export const Default = {
  args: {
    imageUrl: "/shop-2.jpeg",
    name: "Wiaah",
    location: "Switzerland, Geneva",
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
