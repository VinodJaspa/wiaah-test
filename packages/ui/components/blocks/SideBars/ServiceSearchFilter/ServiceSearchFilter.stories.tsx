import { Meta, StoryFn } from "@storybook/react";
import { storybookSidebarsTitle } from "utils";

import { ServiceSearchFilter } from "./ServiceSearchFilter";

export default {
  title: "UI / Blocks / SideBars /ServiceSearchFilter",
  component: ServiceSearchFilter,
} as Meta<typeof ServiceSearchFilter>;

export const Default = {
  args: {},
};
