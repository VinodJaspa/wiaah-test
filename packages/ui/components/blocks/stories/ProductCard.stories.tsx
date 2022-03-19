import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ProductCard } from "../";

export default {
  title: "UI/blocks/ProductCard",
  component: ProductCard,
} as ComponentMeta<typeof ProductCard>;

const Template: ComponentStory<typeof ProductCard> = (args) => (
  <ProductCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "product 1",
  price: 15,
  colors: ["red", "green", "blue"],
  buttonText: "ADD TO CART",
  imageUrl:
    "https://i.guim.co.uk/img/media/2ce8db064eabb9e22a69cc45a9b6d4e10d595f06/392_612_4171_2503/master/4171.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=45b5856ba8cd83e6656fbe5c166951a4",
};
Default.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story {...args} />
      </section>
    );
  },
];
export const Liked = Template.bind({});
Liked.args = {
  name: "product 1",
  price: 15,
  colors: ["red", "green", "blue"],
  liked: true,
  buttonText: "ADD TO CART",
  imageUrl:
    "https://i.guim.co.uk/img/media/2ce8db064eabb9e22a69cc45a9b6d4e10d595f06/392_612_4171_2503/master/4171.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=45b5856ba8cd83e6656fbe5c166951a4",
};
Liked.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story {...args} />
      </section>
    );
  },
];
