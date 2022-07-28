import { randomNum, storybookBeautyCenterCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BeautyCenterRecommendedSearchCard } from "./BeautyCenterRecommendedSearchCard";

export default {
  title: storybookBeautyCenterCardsTitle + "BeautyCenterRecommendedSearchCard",
  component: BeautyCenterRecommendedSearchCard,
} as ComponentMeta<typeof BeautyCenterRecommendedSearchCard>;

const template: ComponentStory<typeof BeautyCenterRecommendedSearchCard> = (
  args
) => <BeautyCenterRecommendedSearchCard {...args} />;

export const Default = template.bind({});
Default.args = {
  name: "Green Leaf Treatments",
  rate: randomNum(5),
  reviews: randomNum(1565),
  owners: ["Perry", "Birmingham"],
  thumbnail:
    "https://www.ariostea-high-tech.com/img/progetti/hotel-spa-wellness/U714/Tacha+Beauty+Center-desktop.jpg",
};
