import { randomNum, storybookHotelCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ServiceCheckoutCard } from "./HotelCheckoutCard";

export default {
  title: storybookHotelCardsTitle + "HotelCheckoutCard",
  component: ServiceCheckoutCard,
} as ComponentMeta<typeof ServiceCheckoutCard>;

const template: ComponentStory<typeof ServiceCheckoutCard> = (args) => (
  <ServiceCheckoutCard {...args} />
);

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
  extras: [
    {
      name: "Breakfast + book now, pay later",
      price: randomNum(100),
    },
  ],
  guests: randomNum(5),
  cashback: {
    amount: randomNum(20),
    type: "percent",
  },
  price: randomNum(500),
  serviceType: "hotel",
};
