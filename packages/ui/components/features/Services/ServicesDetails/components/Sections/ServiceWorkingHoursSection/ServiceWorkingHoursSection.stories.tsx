import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesSectionsTitle } from "utils";
import { ServiceWorkingHoursSection } from "./ServiceWorkingHoursSection";

const meta: ComponentMeta<typeof ServiceWorkingHoursSection> = {
  title: storybookOtherServicesSectionsTitle + "ServiceWorkingHoursSection",
  component: ServiceWorkingHoursSection,
};

export default meta;

const Template: ComponentStory<typeof ServiceWorkingHoursSection> = (args) => (
  <ServiceWorkingHoursSection {...args} />
);

export const Default: ComponentStory<typeof ServiceWorkingHoursSection> =
  Template.bind({});
Default.args = {
  workingHours: {
    id: "1",
    weekdays: {
      mo: { periods: ["2023-06-09T09:00:00.000Z", "2023-06-09T19:30:00.000Z"] },
      tu: { periods: ["2023-06-10T09:00:00.000Z", "2023-06-10T19:30:00.000Z"] },
      we: { periods: ["2023-06-11T09:00:00.000Z", "2023-06-11T19:30:00.000Z"] },
      th: { periods: ["2023-06-12T09:00:00.000Z", "2023-06-12T19:30:00.000Z"] },
      fr: { periods: ["2023-06-13T00:00:00.000Z", "2023-06-13T00:00:00.000Z"] },
      sa: { periods: ["2023-06-14T09:00:00.000Z", "2023-06-14T19:30:00.000Z"] },
      su: { periods: ["2023-06-15T09:00:00.000Z", "2023-06-15T19:30:00.000Z"] },
    },
  },
};
