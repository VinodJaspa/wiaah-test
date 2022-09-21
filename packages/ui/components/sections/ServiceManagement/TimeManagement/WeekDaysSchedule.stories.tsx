import { ComponentMeta, ComponentStory } from "@storybook/react";
import { WeekdaysSchedule } from "./WeekdaysSchedule";
import { storybookServiceManagementSectionsTitle } from "utils";

export default {
  title: storybookServiceManagementSectionsTitle + "WeekDaysSchedule",
  component: WeekdaysSchedule,
} as ComponentMeta<typeof WeekdaysSchedule>;

const template: ComponentStory<typeof WeekdaysSchedule> = (args) => (
  <WeekdaysSchedule {...args} />
);

export const Default = template.bind({});
Default.args = {};
