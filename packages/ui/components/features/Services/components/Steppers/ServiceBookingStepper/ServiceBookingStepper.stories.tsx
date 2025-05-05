import { Meta, StoryFn } from "@storybook/react";
import { storybookOtherServicesDataDisplayTitle } from "utils";
import { ServiceBookingStepper } from "./ServiceBookingStepper";
import { CalenderIcon, DateInput, ClockIcon, TimeInput } from "@UI";

export default {
  title: "UI / Features /Services /Data Display /ServiceBookingStepper",
  component: ServiceBookingStepper,
} as Meta<typeof ServiceBookingStepper>;

export const Default = {
  args: {
    steps: [
      {
        name: "Date",
        icon: CalenderIcon,
        component: DateInput,
      },
      {
        name: "time",
        icon: ClockIcon,
        component: TimeInput,
      },
    ],
  },
};
