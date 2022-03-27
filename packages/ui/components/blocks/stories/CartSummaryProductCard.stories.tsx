import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CartSummaryProductCard } from "../";

export default {
  title: "UI/blocks/CartSummaryProdcutCard",
  component: CartSummaryProductCard,
} as ComponentMeta<typeof CartSummaryProductCard>;

const Template: ComponentStory<typeof CartSummaryProductCard> = (args) => (
  <CartSummaryProductCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  profile: {
    name: "Wiaah",
    thumbnailUrl: "/shop-2.jpeg",
    profileId: "15",
  },
  product: {
    id: "1",
    description:
      "some random long description for testing purposes some random long description for testing purposes",
    imageUrl:
      "https://4.imimg.com/data4/AA/HC/MY-26596027/men-s-fancy-t-shirt-500x500.jpg",
    name: "some random long name for testting purposes",
    price: 15,
    qty: 3,
    shippingMotheds: [
      {
        deliveryTime: {
          from: 5,
          to: 7,
        },
        name: "European union",
        value: "european_union",
      },
      {
        deliveryTime: {
          from: 1,
          to: 3,
        },
        name: "Click & Collect",
        value: "click_and_collect",
      },
      {
        deliveryTime: {
          from: 6,
          to: 8,
        },
        name: "International",
        value: "international",
      },
    ],
    sizes: [
      {
        size: "S",
      },
      {
        size: "M",
      },
      {
        size: "L",
      },
      {
        size: "XL",
      },
      {
        size: "XXL",
      },
      {
        size: "XXXL",
      },
    ],
    colors: [
      {
        name: "red",
        hexCode: "#900",
      },
      {
        name: "green",
        hexCode: "#090",
      },
      {
        name: "blue",
        hexCode: "#009",
      },
      {
        name: "black",
        hexCode: "#000",
      },
    ],
    type: "product",
    discount: {
      unit: "%",
      value: 10,
    },
    oldPrice: 10,
    cashback: {
      unit: "%",
      value: 10,
    },
  },
};
Default.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="h-fit w-fit bg-white">
          <Story {...args} />
        </div>
      </section>
    );
  },
];
export const ServiceVariant = Template.bind({});
ServiceVariant.args = {
  profile: {
    name: "Wiaah",
    thumbnailUrl: "/shop-2.jpeg",
    profileId: "15",
  },
  product: {
    id: "2",
    imageUrl:
      "https://images.prismic.io/rushordertees-web/c46d32cd-469a-49a9-b175-7362171d29a7_Custom+Short+Sleeve+T-Shirt.jpg?auto=compress%2Cformat&rect=0%2C0%2C800%2C900&w=800&h=900",
    name: "item1",
    price: 15,
    qty: 3,
    shippingMotheds: [
      {
        deliveryTime: {
          from: 5,
          to: 7,
        },
        name: "European union",
        value: "european_union",
      },
      {
        deliveryTime: {
          from: 1,
          to: 3,
        },
        name: "Click & Collect",
        value: "click_and_collect",
      },
      {
        deliveryTime: {
          from: 6,
          to: 8,
        },
        name: "International",
        value: "international",
      },
    ],
    type: "service",
    location: "123 main st apt 4 atlana ga",
    date: Date.now(),
    eventDuration: 20,
    eventAdresses: "test@adress.com",
    discount: {
      unit: "%",
      value: 10,
    },
    oldPrice: 10,
    cashback: {
      unit: "%",
      value: 10,
    },
  },
};
ServiceVariant.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="w-full bg-white">
          <Story {...args} />
        </div>
      </section>
    );
  },
];
