import { storybookSearchInputs } from "utils";
import { Meta, StoryFn } from "@storybook/react";

import { ResturantSearchInput } from "./ResturantSearchInput";

export default {
  title: "UI / blocks / Data Input /Search /ResturantSearchInput",
  component: ResturantSearchInput,
} as Meta<typeof ResturantSearchInput>;

export const Default = {
  args: {},
};
