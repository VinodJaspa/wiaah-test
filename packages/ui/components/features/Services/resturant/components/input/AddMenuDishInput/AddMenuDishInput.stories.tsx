import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AddMenuDishInput } from "./AddMenuDishInput";
import { storybookRestaurantInputTitle } from "utils";

export default {
  title: storybookRestaurantInputTitle + "AddMenuDishInput",
  component: AddMenuDishInput,
} as ComponentMeta<typeof AddMenuDishInput>;

const template: ComponentStory<typeof AddMenuDishInput> = (args) => (
  <AddMenuDishInput {...args} />
);

export const Default = template.bind({});
Default.args = {};
