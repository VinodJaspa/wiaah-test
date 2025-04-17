import { randomNum, storybookOtherServicesDataDisplayTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import { BookedServicesCostDetails } from "./BookedServicesCostDetails";

export default {
  title: "UI / Features /Services /Data Display /BookedServicesCostDetails",
  component: BookedServicesCostDetails,
} as Meta<typeof BookedServicesCostDetails>;

export const Default = {
  args: {
    title: "rooms",
    vat: randomNum(15),
  },
};
