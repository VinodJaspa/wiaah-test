import { TimeClockDisplay } from "./TimeClockDisplay";
import { Meta, StoryFn } from "@storybook/react";
import { storybookPartailsTitle } from "utils";

export default {
  title: "UI / partials / TimeClockDisplay",
  component: TimeClockDisplay,
} as Meta<typeof TimeClockDisplay>;

const template: StoryFn<typeof TimeClockDisplay> = (args) => (
  <div className="w-11 h-11 text-primary">
    <TimeClockDisplay {...args} />
  </div>
);

export const Default = {
  render: template,

  args: {
    from: new Date(2022, 8, 11, 15),
    to: new Date(2022, 8, 11, 19),
  },
};
