import { storybookDataDisplayBlocksTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import {
  WorkingDaysCalender,
  WorkingDaysCalenderProps,
} from "./WorkingDaysCalander";
import React from "react";

export default {
  title: "UI / blocks / Data Display /WeekCalander",
  component: WorkingDaysCalender,
} as Meta<typeof WorkingDaysCalender>;

export const Default: { args: WorkingDaysCalenderProps } = {
  args: {
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
  },
};
