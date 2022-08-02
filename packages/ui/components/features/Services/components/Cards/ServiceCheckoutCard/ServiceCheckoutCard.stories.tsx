import { randomNum, storybookOtherServicesCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ServiceCheckoutCard } from "./ServiceCheckoutCard";

export default {
  title: storybookOtherServicesCardsTitle + "ServiceCheckoutCard",
  component: ServiceCheckoutCard,
} as ComponentMeta<typeof ServiceCheckoutCard>;

const template: ComponentStory<typeof ServiceCheckoutCard> = (args) => (
  <ServiceCheckoutCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  bookedDates: {
    checkin: new Date(Date.now()).toString(),
    checkout: new Date(Date.now()).toString(),
  },
  rate: randomNum(5),
  refundingRule: {
    cost: 0,
    duration: 0,
    id: "123",
  },
  reviews: randomNum(153),
  thumbnail: "./place-1.jpg",
  id: "134",
  title: "Citadines Montmartre Paris",
  rateReason: "cleanliness",
  extras: ["Breakfast + Book now, pay later"],
};
