import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookSidebarsTitle } from "utils";

import { ServiceSearchFilter } from "./ServiceSearchFilter";

export default {
  title: storybookSidebarsTitle + "ServiceSearchFilter",
  component: ServiceSearchFilter,
} as ComponentMeta<typeof ServiceSearchFilter>;

const template: ComponentStory<typeof ServiceSearchFilter> = (args) => (
  <ServiceSearchFilter {...args} />
);

export const Default = template.bind({});
Default.args = {};
