import { Meta, StoryFn } from "@storybook/react";
import { SpecialSchedule } from "./SpecialSchedule";
import { storybookServiceManagementSectionsTitle } from "utils";

export default {
  title: "UI / Features /Service Management /Sections /SpecialSchedule",
  component: SpecialSchedule,
} as Meta<typeof SpecialSchedule>;

export const Default = {
  args: {},
};
