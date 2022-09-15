import { StatusSelectInput } from "./StatusSelectInput";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookSearchInputsTitle } from "utils";

export default {
  title: storybookSearchInputsTitle + "StatusSelectInput",
  component: StatusSelectInput,
} as ComponentMeta<typeof StatusSelectInput>;

const template: ComponentStory<typeof StatusSelectInput> = (args) => (
  <StatusSelectInput {...args} />
);

export const Default = template.bind({});
Default.args = {
  options: ["Available", "Out of Stock"],
};
