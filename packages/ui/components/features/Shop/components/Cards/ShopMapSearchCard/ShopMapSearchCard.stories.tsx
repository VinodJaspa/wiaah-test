import { Meta, StoryFn } from "@storybook/react";
import { randomNum, storybookShopFeatureCardsTitle } from "utils";
import { ShopMapSearchCard } from "./ShopMapSearchCard";

export default {
  title: "UI / Features /Shop /Cards /ShopMapSearchCard",
  component: ShopMapSearchCard,
} as Meta<typeof ShopMapSearchCard>;

export const Default = {
  args: {
    id: "123",
    name: "shop name",
    rate: randomNum(5),
    categories: [{ icon: "/", name: "electronics" }],
    thumbnail: "/shop-2.jpeg",
    location: {
      address: "address",
      city: "paris",
      cords: {
        lat: 15,
        lng: 21,
      },
      country: "France",
      countryCode: "CHF",
      postalCode: 135465,
      state: "Geneve",
    },
  },
};
