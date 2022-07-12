import { storybookSearchInputs } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ResturantSearchInput } from "./ResturantSearchInput";

export default {
  title: storybookSearchInputs + "ResturantSearchInput",
  component: ResturantSearchInput,
} as ComponentMeta<typeof ResturantSearchInput>;

const template: ComponentStory<typeof ResturantSearchInput> = (args) => (
  <ResturantSearchInput {...args} />
);

export const Default = template.bind({});
Default.args = {};
