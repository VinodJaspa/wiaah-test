import { Meta, StoryFn } from "@storybook/react";
import { ServicesSearchBadgeList } from "./ServicesSearchBadgeList";
import { storybookOtherServicesDataDisplayTitle } from "utils";

export default {
  title: "UI / Features /Services /Data Display /ServicesSearchBadgeList",
  component: ServicesSearchBadgeList,
} as Meta<typeof ServicesSearchBadgeList>;

export const Default = {
  args: {},
};
