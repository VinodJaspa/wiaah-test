import { Meta, StoryFn } from "@storybook/react";
import { storybookOtherServicesDataDisplayTitle } from "utils";
import { ServicesSearchResultsFiltersSidebar } from "./ServicesSearchResultsFiltersSidebar";

export default {
  title:
    "UI / Features /Services /Data Display /ServicesSearchResultsFiltersSidebar",
  component: ServicesSearchResultsFiltersSidebar,
} as Meta<typeof ServicesSearchResultsFiltersSidebar>;

export const Default = {
  args: {},
};
