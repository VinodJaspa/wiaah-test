import { RestaurantAddMenuForm } from "./RestaruantAddMenuForm";
import { storybookRestaurantInputTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: storybookRestaurantInputTitle + "RestaurantAddMenuForm",
  component: RestaurantAddMenuForm,
} as ComponentMeta<typeof RestaurantAddMenuForm>;

const template: ComponentStory<typeof RestaurantAddMenuForm> = (args) => (
  <RestaurantAddMenuForm {...args} />
);

export const Default = template.bind({});
Default.args = {};
