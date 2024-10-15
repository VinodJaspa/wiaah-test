import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SearchInput } from "..";
import { Country } from "country-state-city";
import { FlagIcon } from "react-flag-kit";
import { Prefix } from "../../partials";

export default {
  title: "UI/blocks/SearchInput",
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => (
  <SearchInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "search here",
};

Default.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-slate-200">
      <Story {...args} />
    </section>
  ),
];
