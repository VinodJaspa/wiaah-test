import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesDataDisplayTitle } from "utils";
import { ServiceBookingStepper } from "./ServiceBookingStepper";
import { CalenderIcon, DateInput, ClockIcon, TimeInput } from "ui";

export default {
  title: storybookOtherServicesDataDisplayTitle + "ServiceBookingStepper",
  component: ServiceBookingStepper,
} as ComponentMeta<typeof ServiceBookingStepper>;

const template: ComponentStory<typeof ServiceBookingStepper> = (args) => (
  <ServiceBookingStepper {...args} />
);

export const Default = template.bind({});
Default.args = {
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
};
