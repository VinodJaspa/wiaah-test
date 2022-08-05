import { randomNum, storybookRestaurantCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ResturantRecommendedCard } from "./ResturantRecommendedCard";

export default {
  title: storybookRestaurantCardsTitle + "ResturantRecommendedCard",
  component: ResturantRecommendedCard,
} as ComponentMeta<typeof ResturantRecommendedCard>;

const template: ComponentStory<typeof ResturantRecommendedCard> = (args) => {
  return <ResturantRecommendedCard {...args} />;
};

export const Default = template.bind({});

Default.args = {
  averagePrice: randomNum(100),
  name: "Le bruit qui court",
  isGoodDeal: true,
  rate: parseInt(`${randomNum(9)}.${randomNum(9)}`),
  reviewsCount: randomNum(600),
  thumbnails: ["/shop.jpeg", "/shop-2.jpeg"],
  location: {
    address: "69ter rue damremont",
    postalCode: 75018,
    city: "paris",
    country: "France",
    cords: {
      lat: 43.546,
      lng: 65.424,
    },
    countryCode: "CH",
    state: "Geneve",
  },
  discount: {
    amount: 50,
    rule: "sur la carte",
  },
};
