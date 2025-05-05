import { StoryFn, Meta } from "@storybook/react";
import { storybookRestaurantListsTitle } from "utils";
import { RestaurantMenuDishsList } from "./RestaurantMenuDishsList";
import React from "react";

export default {
  title: "UI / Features /Restaurant /Lists /RestaurantMenuDishsList",
  component: RestaurantMenuDishsList,
} as Meta<typeof RestaurantMenuDishsList>;

const template: StoryFn<typeof RestaurantMenuDishsList> = (args) => {
  const [state, setState] = React.useState<any[]>([]);

  return (
    <RestaurantMenuDishsList
      {...args}
      value={state}
      onChange={(data) => setState(data)}
    />
  );
};

export const Default = {
  render: template,
  args: {},
};
