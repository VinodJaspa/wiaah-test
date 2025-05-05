import { Meta, StoryFn } from "@storybook/react";
import { randomNum, storybookHealthCenterCardsTitle } from "utils";
import { SearchHealthSpecialtiesCardsList } from "./SearchSpecialtiesCardsList";

export default {
  title: "UI / Features /Health Center /Cards /SearchSpecialitesCardsList",
  component: SearchHealthSpecialtiesCardsList,
} as Meta<typeof SearchHealthSpecialtiesCardsList>;

export const Default = {
  args: {
    specialites: [...Array(15)].map((_, i) => ({ title: "speciality" + i })),
    searchQuery: "spec",
  },
};
