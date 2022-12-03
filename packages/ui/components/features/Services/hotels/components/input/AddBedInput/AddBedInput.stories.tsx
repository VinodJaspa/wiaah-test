import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AddBedInput } from "./AddBedInput";
import { storybookHotelInputTitle } from "utils";

export default {
  title: storybookHotelInputTitle + "AddBedInput",
  component: AddBedInput,
} as ComponentMeta<typeof AddBedInput>;

const template: ComponentStory<typeof AddBedInput> = (args) => (
  <AddBedInput {...args} />
);

export const Default = template.bind({});
Default.args = {};
