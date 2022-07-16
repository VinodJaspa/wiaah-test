import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookCardsTitle } from "utils";
import { HotelSearchCard } from "./HotelsSearchCard";
import React from "react";
export default {
  title: storybookCardsTitle + "HotelSearchCard",
} as ComponentMeta<typeof HotelSearchCard>;

const template: ComponentStory<typeof HotelSearchCard> = (args) => {
  return <HotelSearchCard {...args} />;
};

export const Default = template.bind({});
Default.args = {
  rate: 4.5,
  providerName: "provider",
  thumbnail: "/shop-2.jpeg",
  type: "Professional Host",
  location: "paris,france",
  onLiked: (id) => console.log(id),
  description: "some random description of a hotel service",
  date: {
    from: Date.now(),
    to: Date.now(),
  },
  id: "123",
  price: 324.456,
};
