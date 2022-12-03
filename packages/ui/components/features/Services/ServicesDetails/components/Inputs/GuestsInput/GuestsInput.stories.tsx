import { storybookOtherServicesInputTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { GuestsInput } from "./GuestsInput";

export default {
  title: storybookOtherServicesInputTitle + "GuestsInput",
  component: GuestsInput,
} as ComponentMeta<typeof GuestsInput>;

const template: ComponentStory<typeof GuestsInput> = (args) => (
  <GuestsInput {...args} />
);

export const Default = template.bind({});
Default.args = {};
