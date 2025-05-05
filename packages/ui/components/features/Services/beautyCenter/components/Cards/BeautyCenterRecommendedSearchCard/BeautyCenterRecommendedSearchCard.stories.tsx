import { randomNum, storybookBeautyCenterCardsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import { BeautyCenterRecommendedSearchCard } from "./BeautyCenterRecommendedSearchCard";

export default {
  title:
    "UI / Features /Beauty Center /Cards /BeautyCenterRecommendedSearchCard",
  component: BeautyCenterRecommendedSearchCard,
} as Meta<typeof BeautyCenterRecommendedSearchCard>;

export const Default = {
  args: {
    name: "Green Leaf Treatments",
    rate: randomNum(5),
    reviews: randomNum(1565),
    owners: ["Perry", "Birmingham"],
    thumbnail:
      "https://www.ariostea-high-tech.com/img/progetti/hotel-spa-wellness/U714/Tacha+Beauty+Center-desktop.jpg",
  },
};
