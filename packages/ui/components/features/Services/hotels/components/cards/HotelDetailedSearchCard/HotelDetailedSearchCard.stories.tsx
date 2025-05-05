import { storybookCardsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { HotelDetailedSearchCard } from "./HotelDetailedSearchCard";

export default {
  title: "UI / blocks / cards /HotelSearchCard2",
  component: HotelDetailedSearchCard,
} as Meta<typeof HotelDetailedSearchCard>;

export const Default = {
  args: {
    title: "some random apertemant title",
    provider: "provider",
    rate: 4.8,
    serviceClass: 3.5,
    thumbnail: "/shop-2.jpeg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, deserunt odio quisquam qui sit corrupti ab est voluptas sunt quis nesciunt facilis a debitis eius mollitia quasi eum beatae autem.",
    reviews: 132,
  },
};
