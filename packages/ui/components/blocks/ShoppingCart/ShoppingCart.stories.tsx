import { Meta, StoryFn } from "@storybook/react";
import { ShoppingCartItem } from "@UI/../types/src";
import { useState } from "react";
import { RecoilRoot } from "recoil";
import { ShoppingCart } from "../";

export default {
  title: "UI/blocks/ShoppingCart",
  component: ShoppingCart,
} as Meta<typeof ShoppingCart>;

export const Default = {
  args: {
    items: [
      {
        id: "1",
        name: "item 1",
        price: 15,
        quantity: 1,
        thumbnail: "shop-2.jpeg",
      },
      {
        id: "2",
        name: "item 1",
        price: 15,
        quantity: 2,
        thumbnail: "shop-3.jpeg",
      },
      {
        id: "3",
        name: "item 1",
        price: 17,
        quantity: 3,
        thumbnail: "shop.jpeg",
      },
    ],
    onItemDelete: () => {},
  },

  decorators: [
    (Story, { args: { items, onItemDelete, ...args } }) => {
      const [Items, setItems] = useState<ShoppingCartItem[]>([...items]);

      return (
        <div className=" flex justify-end  p-4 px-12">
          <Story
            args={{
              items: Items,
              onItemDelete: (Item) => {
                setItems((state) => state.filter((item) => item !== Item));
              },
            }}
          />
        </div>
      );
    },
  ],
};
