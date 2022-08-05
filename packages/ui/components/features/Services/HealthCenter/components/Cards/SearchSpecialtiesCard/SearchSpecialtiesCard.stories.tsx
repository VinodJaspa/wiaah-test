import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookHealthCenterCardsTitle } from "utils";
import { SearchHealthSpecialtyCard } from "./SearchSpecialtiesCard";

export default {
  title: storybookHealthCenterCardsTitle + "SearchHealthSpecialtyCard",
  component: SearchHealthSpecialtyCard,
} as ComponentMeta<typeof SearchHealthSpecialtyCard>;

const template: ComponentStory<typeof SearchHealthSpecialtyCard> = (args) => (
  <SearchHealthSpecialtyCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  specialty: {
    title: "spine",
  },
  searchQuery: "",
};

export const searchHighlighted = template.bind({});
searchHighlighted.args = {
  specialty: {
    title: "spine",
  },
  searchQuery: "in",
};
