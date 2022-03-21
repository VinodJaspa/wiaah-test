import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { RecoilRoot } from "recoil";
import { ShoppingCart } from "../";
import { ShoppingCartItem } from "../../../types/shoppingCart/shoppingCartItem.interface";

export default {
  title: "UI/blocks/ShoppingCart",
  component: ShoppingCart,
} as ComponentMeta<typeof ShoppingCart>;

const Templete: ComponentStory<typeof ShoppingCart> = (args) => (
  <ShoppingCart {...args} />
);

export const Default = Templete.bind({});
Default.args = {
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
};
Default.decorators = [
  (Story, { args: { items, onItemDelete, ...args } }) => {
    const [Items, setItems] = useState<ShoppingCartItem[]>([...items]);

    return (
      <RecoilRoot>
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
      </RecoilRoot>
    );
  },
];
