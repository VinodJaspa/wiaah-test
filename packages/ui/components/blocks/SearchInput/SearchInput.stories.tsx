import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SearchInput } from "..";
import { Country } from "country-state-city";
import { FlagIcon } from "react-flag-kit";
import { Prefix } from "../../partials";

export default {
  title: "UI/blocks/SearchInput",
  component: SearchInput,
} as Meta<typeof SearchInput>;

export const Default = {
  args: {
    placeholder: "search here",
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full flex-col items-center justify-center bg-slate-200">
        <Story {...args} />
      </section>
    ),
  ],
};
