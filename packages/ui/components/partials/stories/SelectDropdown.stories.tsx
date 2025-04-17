import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { SelectDropdown } from "../";

export default {
  title: "UI/partials/SelectDropdown",
  component: SelectDropdown,
} as Meta<typeof SelectDropdown>;

export const Default = {
  args: {
    id: "test",
    name: "test select",
    options: [
      {
        name: "Option 1 ",
        value: "option-1",
      },
      {
        name: "Option 2 ",
        value: "option-2",
      },
      {
        name: "Option 3 ",
        value: "option-3",
      },
    ],
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-200">
          <Story {...args} />
        </section>
      );
    },
  ],
};
