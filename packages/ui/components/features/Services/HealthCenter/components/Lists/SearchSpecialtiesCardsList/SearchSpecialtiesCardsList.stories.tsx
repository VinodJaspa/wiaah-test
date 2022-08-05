import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookHealthCenterCardsTitle } from "utils";
import { SearchHealthSpecialtiesCardsList } from "./SearchSpecialtiesCardsList";

export default {
  title: storybookHealthCenterCardsTitle + "SearchSpecialitesCardsList",
  component: SearchHealthSpecialtiesCardsList,
} as ComponentMeta<typeof SearchHealthSpecialtiesCardsList>;

const template: ComponentStory<typeof SearchHealthSpecialtiesCardsList> = (
  args
) => <SearchHealthSpecialtiesCardsList {...args} />;

export const Default = template.bind({});
Default.args = {
  specialites: [...Array(15)].map((_, i) => ({ title: "speciality" + i })),
  searchQuery: "spec",
};
