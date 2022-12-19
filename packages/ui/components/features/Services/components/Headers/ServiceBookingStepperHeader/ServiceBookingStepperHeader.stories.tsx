import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesDataDisplayTitle } from "utils";
import { ServiceBookingStepperHeader } from "./ServiceBookingStepperHeader";
import { CalenderIcon, ClockIcon, PersonIcon } from "@UI";

export default {
  title: storybookOtherServicesDataDisplayTitle + "ServiceBookingStepperHeader",
  component: ServiceBookingStepperHeader,
} as ComponentMeta<typeof ServiceBookingStepperHeader>;

const template: ComponentStory<typeof ServiceBookingStepperHeader> = (args) => (
  <ServiceBookingStepperHeader {...args} />
);

export const Default = template.bind({});
Default.args = {
  currentStepIdx: 0,
  steps: [
    {
      icon: CalenderIcon,
      name: "date",
    },
    {
      icon: ClockIcon,
      name: "time",
    },
    {
      icon: PersonIcon,
      name: "guests",
    },
  ],
};
