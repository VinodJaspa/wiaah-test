import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesSectionsTitle } from "utils";
import { ServiceWorkingHoursSection } from "./ServiceWorkingHoursSection";

export default {
  title: storybookOtherServicesSectionsTitle + "ServiceWorkingHoursSection",
  component: ServiceWorkingHoursSection,
} as ComponentMeta<typeof ServiceWorkingHoursSection>;

const template: ComponentStory<typeof ServiceWorkingHoursSection> = (args) => (
  <ServiceWorkingHoursSection {...args} />
);

export const Default = template.bind({});
Default.args = {
  workingDays: [
    {
      weekDay: "Friday",
      from: {
        hour: 0,
        minutes: 0,
      },
      to: {
        hour: 0,
        minutes: 0,
      },
    },
    {
      weekDay: "Monday",
      from: {
        hour: 9,
        minutes: 0,
      },
      to: {
        hour: 19,
        minutes: 30,
      },
    },
    {
      weekDay: "Saturday",
      from: {
        hour: 9,
        minutes: 0,
      },
      to: {
        hour: 19,
        minutes: 30,
      },
    },
    {
      weekDay: "Sunday",
      from: {
        hour: 9,
        minutes: 0,
      },
      to: {
        hour: 19,
        minutes: 30,
      },
    },
    {
      weekDay: "Thursday",
      from: {
        hour: 9,
        minutes: 0,
      },
      to: {
        hour: 19,
        minutes: 30,
      },
    },
    {
      weekDay: "Tuesday",
      from: {
        hour: 9,
        minutes: 0,
      },
      to: {
        hour: 19,
        minutes: 30,
      },
    },
    {
      weekDay: "Wednesday",
      from: {
        hour: 9,
        minutes: 0,
      },
      to: {
        hour: 19,
        minutes: 30,
      },
    },
  ],
};
