import { Meta, StoryFn } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import { TimeRangeDisplay } from "./TimeRangeDisplay";

export default {
  title: "UI / partials / TimeRangeDisplay",
  component: TimeRangeDisplay,
} as Meta<typeof TimeRangeDisplay>;

export const Default = {
  args: {
    rangeInMinutes: [40, 80],
  },
};
