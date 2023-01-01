import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesInputTitle } from "utils";
import { ServiceCancelationPolicyInput } from "./ServiceCancelationPolicyInput";
import { CalenderIcon, ClockIcon, PersonIcon } from "@UI";

export default {
  title: storybookOtherServicesInputTitle + "ServiceCancelationPolicyInput",
  component: ServiceCancelationPolicyInput,
} as ComponentMeta<typeof ServiceCancelationPolicyInput>;

const template: ComponentStory<typeof ServiceCancelationPolicyInput> = (
  args
) => <ServiceCancelationPolicyInput {...args} />;

export const Default = template.bind({});
Default.args = {
  cost: 5,
  duration: 8,
  name: "cancelation policy",
  id: "123",
};
