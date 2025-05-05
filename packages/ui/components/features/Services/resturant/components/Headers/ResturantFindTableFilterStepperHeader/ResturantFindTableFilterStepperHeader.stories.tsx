import { Meta, StoryFn } from "@storybook/react";
import { storybookSteppersHeadersTitle } from "utils";
import { ResturantFindTableFilterStepperHeader } from "./ResturantFindTableFilterStepperHeader";

export default {
  title: "UI / Blocks / SteppersHeaders /ResturantFindTableFilterStepperHeader",
  component: ResturantFindTableFilterStepperHeader,
} as Meta<typeof ResturantFindTableFilterStepperHeader>;

export const Default = {
  args: {
    currentStepIdx: 0,
  },
};
