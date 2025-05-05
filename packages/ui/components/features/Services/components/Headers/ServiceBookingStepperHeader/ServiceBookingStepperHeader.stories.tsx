import { Meta, StoryFn } from "@storybook/react";
import { storybookOtherServicesDataDisplayTitle } from "utils";
import { ServiceBookingStepperHeader } from "./ServiceBookingStepperHeader";
import { CalenderIcon, ClockIcon, PersonIcon } from "@UI";

export default {
  title: "UI / Features /Services /Data Display /ServiceBookingStepperHeader",
  component: ServiceBookingStepperHeader,
} as Meta<typeof ServiceBookingStepperHeader>;

export const Default = {
  args: {
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
  },
};
