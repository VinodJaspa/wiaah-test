import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookDataInputBlocksTitle } from "utils";
import { CountInput } from "./CountInput";

export default {
  title: storybookDataInputBlocksTitle + "CountInput",
  component: CountInput,
} as ComponentMeta<typeof CountInput>;

const template: ComponentStory<typeof CountInput> = (args) => (
  <CountInput {...args} />
);

export const Default = template.bind({});
Default.args = {};

export const Bounded = template.bind({});
Bounded.args = {
  min: 0,
  max: 5,
};
