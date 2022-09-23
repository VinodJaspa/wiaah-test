import { ServiceDetailsReviewsSection } from "./ServiceDetailsReviewsSection";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesSectionsTitle } from "utils";

export default {
  title: storybookOtherServicesSectionsTitle + "ServiceDetailsReviewsSection",
  component: ServiceDetailsReviewsSection,
} as ComponentMeta<typeof ServiceDetailsReviewsSection>;

const template: ComponentStory<typeof ServiceDetailsReviewsSection> = (
  args
) => <ServiceDetailsReviewsSection {...args} />;

export const Default = template.bind({});
Default.args = {
  overAllRating: 5,
  ratingLevels: [
    {
      rate: 4.9,
      name: "Amenities",
    },
    {
      name: "Communication",
      rate: 5,
    },
    {
      name: "Value for Money",
      rate: 5,
    },
    {
      name: "Hygiene",
      rate: 5,
    },
    {
      name: "Location of Property",
      rate: 5,
    },
  ],
  reviews: [...Array(6)].map((_, i) => ({
    name: "John Doberman",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    thumbnail: `/profile (${i + 1}).jfif`,
    date: new Date().toString(),
  })),
};
