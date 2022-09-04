import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ServicesSearchBadgeList } from "./ServicesSearchBadgeList";
import { storybookOtherServicesDataDisplayTitle } from "utils";

export default {
  title: storybookOtherServicesDataDisplayTitle + "ServicesSearchBadgeList",
  component: ServicesSearchBadgeList,
} as ComponentMeta<typeof ServicesSearchBadgeList>;

const template: ComponentStory<typeof ServicesSearchBadgeList> = (args) => (
  <ServicesSearchBadgeList {...args} />
);

export const Default = template.bind({});
Default.args = {};
