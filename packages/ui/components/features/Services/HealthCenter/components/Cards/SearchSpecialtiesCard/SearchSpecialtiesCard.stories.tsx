import { Meta, StoryFn } from "@storybook/react";
import { randomNum, storybookHealthCenterCardsTitle } from "utils";
import { SearchHealthSpecialtyCard } from "./SearchSpecialtiesCard";

export default {
  title: "UI / Features /Health Center /Cards /SearchHealthSpecialtyCard",
  component: SearchHealthSpecialtyCard,
} as Meta<typeof SearchHealthSpecialtyCard>;

export const Default = {
  args: {
    specialty: {
      title: "spine",
    },
    searchQuery: "",
  },
};

export const searchHighlighted = {
  args: {
    specialty: {
      title: "spine",
    },
    searchQuery: "in",
  },
};
