import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesDataDisplayTitle } from "utils";
import { ServicesSearchResultsFiltersSidebar } from "./ServicesSearchResultsFiltersSidebar";

export default {
  title:
    storybookOtherServicesDataDisplayTitle +
    "ServicesSearchResultsFiltersSidebar",
  component: ServicesSearchResultsFiltersSidebar,
} as ComponentMeta<typeof ServicesSearchResultsFiltersSidebar>;

const template: ComponentStory<typeof ServicesSearchResultsFiltersSidebar> = (
  args
) => <ServicesSearchResultsFiltersSidebar {...args} />;

export const Default = template.bind({});
Default.args = {};
