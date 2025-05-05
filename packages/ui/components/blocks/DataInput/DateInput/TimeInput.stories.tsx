import { storybookDataInputBlocksTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import { TimeInput } from "./TimeInput";

export default {
  title: "UI / blocks / Data Input /TimeInput",
  component: TimeInput,
} as Meta<typeof TimeInput>;

export const Default = {
  args: {
    timeRange: {
      from: { hour: 8, minutes: 30 },
      to: { hour: 20, minutes: 30 },
    },
  },
};
