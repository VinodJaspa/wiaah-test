import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { TipTextContainer } from "../";

export default {
  title: "UI/blocks/TipTextContainer",
  component: TipTextContainer,
} as Meta<typeof TipTextContainer>;

export const Default = {
  args: {
    children:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam odit tempore consequuntur! Laboriosam, et rerum consequatur nisi aliquam minima. Odit ab molestiae error provident quisquam consequatur eligendi tenetur corporis modi.",
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
