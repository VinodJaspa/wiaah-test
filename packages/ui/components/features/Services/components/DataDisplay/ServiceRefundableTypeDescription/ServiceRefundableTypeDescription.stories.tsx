import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ServiceRefundableTypeDescription } from "./ServiceRefundableTypeDescription";
import { storybookOtherServicesDataDisplayTitle } from "utils";

export default {
  title:
    storybookOtherServicesDataDisplayTitle + "ServiceRefundableTypeDescription",
  component: ServiceRefundableTypeDescription,
} as ComponentMeta<typeof ServiceRefundableTypeDescription>;

const template: ComponentStory<typeof ServiceRefundableTypeDescription> = (
  args
) => <ServiceRefundableTypeDescription {...args} />;

export const WithDisplayCost = template.bind({});
WithDisplayCost.args = {
  bookedDate: new Date(),
  cost: 5,
  duration: 15,
  displayCost: true,
};

export const WithCostAndDuration = template.bind({});
WithCostAndDuration.args = {
  bookedDate: new Date(),
  cost: 5,
  duration: 15,
};
export const WithCostAndNoDuration = template.bind({});
WithCostAndNoDuration.args = {
  bookedDate: new Date(),
  cost: 5,
  duration: 0,
};

export const WithDurationAndNoCost = template.bind({});
WithDurationAndNoCost.args = {
  bookedDate: new Date(),
  cost: 0,
  duration: 5,
};

export const WithoutCostAndDuration = template.bind({});
WithoutCostAndDuration.args = {
  bookedDate: new Date(),
  cost: 0,
  duration: 0,
};
