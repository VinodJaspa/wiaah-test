import { Meta, StoryFn } from "@storybook/react";
import { BookingsHistorySection } from "./BookingsHistory";
import { storybookSectionsTitle } from "utils";

export default {
  title: "UI / sections / BookingsHistory",
  component: BookingsHistorySection,
} as Meta<typeof BookingsHistorySection>;

export const Default = {
  args: {},
};
