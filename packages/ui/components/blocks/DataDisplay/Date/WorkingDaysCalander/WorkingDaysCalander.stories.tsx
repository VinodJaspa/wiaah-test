import { storybookDataDisplayBlocksTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  WorkingDaysCalender,
  WorkingDaysCalenderProps,
} from "./WorkingDaysCalander";
import React from "react";

export default {
  title: storybookDataDisplayBlocksTitle + "WeekCalander",
  component: WorkingDaysCalender,
} as ComponentMeta<typeof WorkingDaysCalender>;

const template: ComponentStory<typeof WorkingDaysCalender> = (args) => (
  <WorkingDaysCalender {...args} />
);

export const Default: { args: WorkingDaysCalenderProps } = template.bind({});
Default.args = {
  workingDates: [
    {
      date: Date.now().toString(),
      workingHoursRanges: [...Array(2)].map(() => ({
        from: Date.now().toString(),
        to: Date.now().toString(),
      })),
    },
    {
      date: Date.now().toString(),
      workingHoursRanges: [...Array(1)].map(() => ({
        from: Date.now().toString(),
        to: Date.now().toString(),
      })),
    },
    {
      date: Date.now().toString(),
      workingHoursRanges: [...Array(2)].map(() => ({
        from: Date.now().toString(),
        to: Date.now().toString(),
      })),
    },
    {
      date: Date.now().toString(),
      workingHoursRanges: [...Array(1)].map(() => ({
        from: Date.now().toString(),
        to: Date.now().toString(),
      })),
    },
    {
      date: Date.now().toString(),
      workingHoursRanges: [...Array(2)].map(() => ({
        from: Date.now().toString(),
        to: Date.now().toString(),
      })),
    },
  ],

  takenDates: [
    {
      date: Date.now().toString(),
      workingHoursRanges: [...Array(2)].map(() => ({
        from: Date.now().toString(),
        to: Date.now().toString(),
      })),
    },
    {
      date: Date.now().toString(),
      workingHoursRanges: [...Array(1)].map(() => ({
        from: Date.now().toString(),
        to: Date.now().toString(),
      })),
    },
    {
      date: Date.now().toString(),
      workingHoursRanges: [...Array(2)].map(() => ({
        from: Date.now().toString(),
        to: Date.now().toString(),
      })),
    },
    {
      date: Date.now().toString(),
      workingHoursRanges: [...Array(1)].map(() => ({
        from: Date.now().toString(),
        to: Date.now().toString(),
      })),
    },
    {
      date: Date.now().toString(),
      workingHoursRanges: [...Array(2)].map(() => ({
        from: Date.now().toString(),
        to: Date.now().toString(),
      })),
    },
  ],
};
