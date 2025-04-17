import { Meta, StoryFn } from "@storybook/react";
import { OrderConfirmationProductsTable } from "./index";
import { storybookDataDisplayBlocksTitle } from "utils";

export default {
  title: "UI / blocks / Data Display /OrderConfirmationProductsTable",
  component: OrderConfirmationProductsTable,
} as Meta<typeof OrderConfirmationProductsTable>;

export const Default = {
  args: {
    products: [...Array(10)].map(() => ({
      item: {
        id: "132",
        imageUrl: "/shop-2.jpeg",
        name: "item",
        price: 15,
        qty: 1,
        type: "product",
        cashback: 5,
        colors: ["red"],
        date: new Date(),
        description: "description",
        discount: 30,
        location: "location",
        sizes: ["small"],
      },
      shop: {
        id: "132",
        imageUrl: "/shop-3.jpeg",
        name: "name",
      },
    })),
  },
};
