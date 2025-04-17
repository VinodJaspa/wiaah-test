import { Meta, StoryFn } from "@storybook/react";
import { storybookCardsTitle } from "utils";
import { HotelSearchCard } from "./HotelsSearchCard";
import React from "react";
export default {
  title: "UI / blocks / cards /HotelSearchCard",
} as Meta<typeof HotelSearchCard>;

const template: StoryFn<typeof HotelSearchCard> = (args) => {
  return <HotelSearchCard {...args} />;
};

export const Default = {
  render: template,

  args: {
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
  },
};
