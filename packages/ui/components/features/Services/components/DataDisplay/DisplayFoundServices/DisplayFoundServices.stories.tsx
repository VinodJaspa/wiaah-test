import { Meta, StoryFn } from "@storybook/react";
import { randomNum, storybookOtherServicesDataDisplayTitle } from "utils";
import { DisplayFoundServices } from "./DisplayFoundServices";

export default {
  title: "UI / Features /Services /Data Display /DisplayFoundServices",
  component: DisplayFoundServices,
} as Meta<typeof DisplayFoundServices>;

export const Default = {
  args: {
    servicesNum: randomNum(153),
    location: "milano",
  },
};
