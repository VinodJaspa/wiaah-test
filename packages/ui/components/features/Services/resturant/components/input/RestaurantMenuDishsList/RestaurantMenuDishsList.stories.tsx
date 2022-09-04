import { ComponentStory, ComponentMeta } from "@storybook/react";
import { storybookRestaurantListsTitle } from "utils";
import { RestaurantMenuDishsList } from "./RestaurantMenuDishsList";
import React from "react";

export default {
  title: storybookRestaurantListsTitle + "RestaurantMenuDishsList",
  component: RestaurantMenuDishsList,
} as ComponentMeta<typeof RestaurantMenuDishsList>;

const template: ComponentStory<typeof RestaurantMenuDishsList> = (args) => {
  const [state, setState] = React.useState<any[]>([]);

  return (
    <RestaurantMenuDishsList
      {...args}
      value={state}
      onChange={(data) => setState(data)}
    />
  );
};

export const Default = template.bind({});
Default.args = {};
