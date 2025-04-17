import { Meta, StoryFn } from "@storybook/react";
import { BookingsCalenderSection } from "./BookingsCalender";
import { storybookSectionsTitle } from "utils";

export default {
  title: "UI / sections / BookingsCalender",
  component: BookingsCalenderSection,
} as Meta<typeof BookingsCalenderSection>;

export const Default = {
  args: {},
};
