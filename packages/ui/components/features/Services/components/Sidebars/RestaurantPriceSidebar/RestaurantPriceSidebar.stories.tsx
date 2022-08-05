import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookOtherServicesDataDisplayTitle } from "utils";
import { RestaurantPriceSidebar } from "./RestaurantPriceSidebar";

export default {
  title: storybookOtherServicesDataDisplayTitle + "RestaurantPriceSidebar",
  component: RestaurantPriceSidebar,
} as ComponentMeta<typeof RestaurantPriceSidebar>;

const template: ComponentStory<typeof RestaurantPriceSidebar> = (args) => (
  <RestaurantPriceSidebar {...args} />
);

export const Default = template.bind({});
Default.args = {
  vatPercent: randomNum(15),
};
