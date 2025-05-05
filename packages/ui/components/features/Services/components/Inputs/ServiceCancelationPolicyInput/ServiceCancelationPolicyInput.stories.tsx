import { Meta, StoryFn } from "@storybook/react";
import { storybookOtherServicesInputTitle } from "utils";
import { ServiceCancelationPolicyInput } from "./ServiceCancelationPolicyInput";
import { CalenderIcon, ClockIcon, PersonIcon } from "@UI";

export default {
  title: "UI / Features /Services /Inputs /ServiceCancelationPolicyInput",
  component: ServiceCancelationPolicyInput,
} as Meta<typeof ServiceCancelationPolicyInput>;

export const Default = {
  args: {
    cost: 5,
    duration: 8,
    name: "cancelation policy",
    id: "123",
  },
};
