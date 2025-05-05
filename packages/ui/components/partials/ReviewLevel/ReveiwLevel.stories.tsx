import { ReviewLevel } from "./ReviewLevel";
import { Meta, StoryFn } from "@storybook/react";
import { storybookOtherServicesDataDisplayTitle } from "utils";

export default {
  title: "UI / Features /Services /Data Display /ReviewLevel",
  component: ReviewLevel,
} as Meta<typeof ReviewLevel>;

export const Default = {
  args: {
    name: "Amenites",
    rate: 5,
  },
};

export const decimel = {
  args: {
    name: "Amenites",
    rate: 3.8,
  },
};
