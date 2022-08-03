import { randomNum, storybookHealthCenterCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HealthCenterCheckoutCard } from "./HealthCenterCheckoutCard";

export default {
  title: storybookHealthCenterCardsTitle + "HealthCenterCheckoutCard",
  component: HealthCenterCheckoutCard,
} as ComponentMeta<typeof HealthCenterCheckoutCard>;

const template: ComponentStory<typeof HealthCenterCheckoutCard> = (args) => (
  <HealthCenterCheckoutCard {...args} />
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

  guests: randomNum(5),
  cashback: {
    amount: randomNum(20),
    type: "percent",
  },
  price: randomNum(500),
  serviceType: "hotel",
  doctor: {
    id: "123",
    name: "Doctor 1",
    specialty: "spine",
    photo:
      "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
  },
};
