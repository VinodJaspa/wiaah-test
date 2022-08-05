import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookOtherServicesDataDisplayTitle } from "utils";
import { DisplayFoundServices } from "./DisplayFoundServices";

export default {
  title: storybookOtherServicesDataDisplayTitle + "DisplayFoundServices",
  component: DisplayFoundServices,
} as ComponentMeta<typeof DisplayFoundServices>;

const template: ComponentStory<typeof DisplayFoundServices> = (args) => (
  <DisplayFoundServices {...args} />
);

export const Default = template.bind({});
Default.args = {
  servicesNum: randomNum(153),
  location: "milano",
};
