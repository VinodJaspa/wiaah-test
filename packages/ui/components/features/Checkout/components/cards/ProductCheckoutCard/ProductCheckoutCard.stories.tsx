import { Meta, StoryFn } from "@storybook/react";
import { storybookCheckoutCardsTitle } from "utils";
import { ProductCheckoutCard } from "./ProductCheckoutCard";

export default {
  title: "UI / Features /checkout /Cards /ProductCheckoutCard",
  component: ProductCheckoutCard,
} as Meta<typeof ProductCheckoutCard>;

export const Default = {
  args: {
    location: {
      address: "address",
      city: "city",
      cords: {
        lat: 15,
        lng: 16,
      },
      country: "country",
      countryCode: "CH",
      postalCode: 13254,
      state: "state",
    },
    id: "2",
    thumbnail:
      "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
    name: "item1",
    price: 15,
    qty: 3,
    shippingMethods: [
      {
        cost: 15,
        description: "test",
        id: "12",
        deliveryTime: {
          from: 5,
          to: 7,
        },
        name: "European union",
        value: "european_union",
      },
      {
        cost: 0,
        description: "test",
        id: "12",
        deliveryTime: {
          from: 1,
          to: 3,
        },
        name: "Click & Collect",
        value: "click_and_collect",
      },
      {
        cost: 20,
        description: "test",
        id: "12",
        deliveryTime: {
          from: 6,
          to: 8,
        },
        name: "International",
        value: "international",
      },
    ],
    color: "red",
    size: "One Size",
    cashback: {
      amount: 4,
      type: "cash",
    },
    discount: 10,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloremque molestiae perferendis saepe? Tenetur, eligendi. Excepturi voluptate harum fuga! Consequatur?`,
  },
};
