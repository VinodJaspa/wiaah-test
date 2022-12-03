import { storybookDataDisplayBlocksTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  WorkingDaysCalander,
  WorkingDaysCalanderProps,
} from "./WorkingDaysCalander";
import React from "react";

export default {
  title: storybookDataDisplayBlocksTitle + "WeekCalander",
  component: WorkingDaysCalander,
} as ComponentMeta<typeof WorkingDaysCalander>;

const template: ComponentStory<typeof WorkingDaysCalander> = (args) => (
  <WorkingDaysCalander {...args} />
);

export const Default: { args: WorkingDaysCalanderProps } = template.bind({});
Default.args = {
  hoursLimit: 3,
  workingDates: [
    {
      date: Date.now(),
      workingHoursRanges: [...Array(2)].map(() => ({
        from: Date.now(),
        to: Date.now(),
      })),
    },
    {
      date: Date.now(),
      workingHoursRanges: [...Array(1)].map(() => ({
        from: Date.now(),
        to: Date.now(),
      })),
    },
    {
      date: Date.now(),
      workingHoursRanges: [...Array(2)].map(() => ({
        from: Date.now(),
        to: Date.now(),
      })),
    },
    {
      date: Date.now(),
      workingHoursRanges: [...Array(1)].map(() => ({
        from: Date.now(),
        to: Date.now(),
      })),
    },
    {
      date: Date.now(),
      workingHoursRanges: [...Array(2)].map(() => ({
        from: Date.now(),
        to: Date.now(),
      })),
    },
  ],
};
