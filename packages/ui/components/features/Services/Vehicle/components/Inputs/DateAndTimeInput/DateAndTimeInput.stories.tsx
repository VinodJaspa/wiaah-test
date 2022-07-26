import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookDataInputBlocksTitle } from "utils";
import { DateAndTimeInput } from "./DateAndTimeInput";

export default {
  title: storybookDataInputBlocksTitle + "DateAndTimeInput",
  component: DateAndTimeInput,
} as ComponentMeta<typeof DateAndTimeInput>;

const template: ComponentStory<typeof DateAndTimeInput> = (args) => (
  <DateAndTimeInput {...args} />
);

export const Default = template.bind({});
Default.args = {
  dateLabel: "pick-up date",
};
