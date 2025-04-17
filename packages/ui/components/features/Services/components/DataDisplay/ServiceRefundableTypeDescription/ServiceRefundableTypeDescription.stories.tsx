import { Meta, StoryFn } from "@storybook/react";
import { ServiceRefundableTypeDescription } from "./ServiceRefundableTypeDescription";
import { storybookOtherServicesDataDisplayTitle } from "utils";

export default {
  title:
    "UI / Features /Services /Data Display /ServiceRefundableTypeDescription",
  component: ServiceRefundableTypeDescription,
} as Meta<typeof ServiceRefundableTypeDescription>;

export const WithDisplayCost = {
  args: {
    bookedDate: new Date(),
    cost: 5,
    duration: 15,
    displayCost: true,
  },
};

export const WithCostAndDuration = {
  args: {
    bookedDate: new Date(),
    cost: 5,
    duration: 15,
  },
};

export const WithCostAndNoDuration = {
  args: {
    bookedDate: new Date(),
    cost: 5,
    duration: 0,
  },
};

export const WithDurationAndNoCost = {
  args: {
    bookedDate: new Date(),
    cost: 0,
    duration: 5,
  },
};

export const WithoutCostAndDuration = {
  args: {
    bookedDate: new Date(),
    cost: 0,
    duration: 0,
  },
};
