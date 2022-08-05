import { randomNum, storybookRestaurantCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ResturantCheckoutCard } from "./ResturantCheckoutCard";

export default {
  title: storybookRestaurantCardsTitle + "Restaurant Checkout card",
  component: ResturantCheckoutCard,
} as ComponentMeta<typeof ResturantCheckoutCard>;

const template: ComponentStory<typeof ResturantCheckoutCard> = (args) => (
  <ResturantCheckoutCard {...args} />
);

const senctence =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima libero perferendis fugit error unde, adipisci possimus totam mollitia? Inventore odio soluta nisi magnam vitae id voluptatum cum atque maiores nihil";

export const Default = template.bind({});
Default.args = {
  bookedDates: {
    from: new Date(Date.now()).toString(),
    to: new Date(Date.now()).toString(),
  },
  rate: randomNum(5),
  refundingRule: {
    cost: 0,
    duration: 0,
    id: "12",
  },
  reviews: randomNum(153),
  thumbnail: "/place-1.jpg",
  id: "123",
  rateReason: "cleanliness",
  title: "Citadines Montmartre Paris",
  guests: randomNum(5),
  cashback: {
    amount: randomNum(20),
    type: "percent",
  },
  price: randomNum(500),
  serviceType: "hotel",
  bookedMenus: [
    {
      price: randomNum(100),
      qty: randomNum(10),
      title: senctence.slice(0, randomNum(senctence.length)),
    },
  ],
};
