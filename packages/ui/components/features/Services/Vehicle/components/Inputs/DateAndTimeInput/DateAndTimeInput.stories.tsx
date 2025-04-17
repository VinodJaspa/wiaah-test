import { Meta, StoryFn } from "@storybook/react";
import { storybookDataInputBlocksTitle } from "utils";
import { DateAndTimeInput } from "./DateAndTimeInput";

export default {
  title: "UI / blocks / Data Input /DateAndTimeInput",
  component: DateAndTimeInput,
} as Meta<typeof DateAndTimeInput>;

export const Default = {
  args: {
    dateLabel: "pick-up date",
  },
};
