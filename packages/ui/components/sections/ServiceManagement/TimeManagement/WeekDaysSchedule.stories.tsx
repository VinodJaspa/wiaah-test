import { Meta, StoryFn } from "@storybook/react";
import { WeekdaysSchedule } from "./WeekdaysSchedule";
import { storybookServiceManagementSectionsTitle } from "utils";

export default {
  title: "UI / Features /Service Management /Sections /WeekDaysSchedule",
  component: WeekdaysSchedule,
} as Meta<typeof WeekdaysSchedule>;

export const Default = {
  args: {},
};
