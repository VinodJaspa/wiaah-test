import { randomNum, storybookBeautyCenterCardsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import { BeautyCenterCheckoutCard } from "./BeautyCenterCheckoutCard";


export default {
  title: "UI / Features /Beauty Center /Cards /BeautyCenterCheckoutCard",
  component: BeautyCenterCheckoutCard,
} as Meta<typeof BeautyCenterCheckoutCard>;

export const Default = {
  args: {
    bookedDates: {
      from: new Date(Date.now()).toString(),
      to: null,
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
    cashback: {
      amount: randomNum(20),
      type: "percent",
    },
    price: randomNum(500),
    serviceType: "hotel",
    bookedTreatments: [
      {
        id: "123",
        category: "Facial",
        title: "Hydro facial with chemical peel",
        durationInMinutes: [30, 60],
        price: randomNum(50),
        discount: randomNum(60),
      },
    ],
  },
};
