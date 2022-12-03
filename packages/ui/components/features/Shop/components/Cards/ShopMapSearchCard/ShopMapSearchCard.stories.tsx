import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookShopFeatureCardsTitle } from "utils";
import { ShopMapSearchCard } from "./ShopMapSearchCard";

export default {
  title: storybookShopFeatureCardsTitle + "ShopMapSearchCard",
  component: ShopMapSearchCard,
} as ComponentMeta<typeof ShopMapSearchCard>;

const template: ComponentStory<typeof ShopMapSearchCard> = (args) => (
  <ShopMapSearchCard {...args} />
);

export const Default = template.bind({});
Default.args = {
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
};
