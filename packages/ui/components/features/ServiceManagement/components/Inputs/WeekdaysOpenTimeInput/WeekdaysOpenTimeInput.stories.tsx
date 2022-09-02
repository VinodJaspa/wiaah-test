import { ComponentMeta, ComponentStory } from "@storybook/react";
import { WeekdaysOpenTimeInput } from "./WeekdaysOpenTimeInput";
import { storybookServiceManagementInputTitle } from "utils";

export default {
  title: storybookServiceManagementInputTitle + "WeekDaysOpenTiemInput",
  component: WeekdaysOpenTimeInput,
} as ComponentMeta<typeof WeekdaysOpenTimeInput>;

const template: ComponentStory<typeof WeekdaysOpenTimeInput> = (args) => (
  <WeekdaysOpenTimeInput {...args} />
);

export const Default = template.bind({});
Default.args = {};
