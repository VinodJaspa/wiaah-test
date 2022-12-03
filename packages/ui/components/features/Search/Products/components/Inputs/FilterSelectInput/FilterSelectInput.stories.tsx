import { FilterSelectInput } from "./FilterSelectInput";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookSearchInputsTitle } from "utils";

export default {
  title: storybookSearchInputsTitle + "FilterSelectInput",
  component: FilterSelectInput,
} as ComponentMeta<typeof FilterSelectInput>;

const template: ComponentStory<typeof FilterSelectInput> = (args) => (
  <FilterSelectInput {...args} />
);

export const Default = template.bind({});
Default.args = {
  options: ["Available", "Out of Stock"],
};
