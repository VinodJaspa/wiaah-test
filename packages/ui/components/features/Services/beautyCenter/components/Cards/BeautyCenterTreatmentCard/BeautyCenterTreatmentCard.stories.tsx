import { Meta, StoryFn } from "@storybook/react";
import { randomNum, storybookBeautyCenterCardsTitle } from "utils";
import { BeautyCenterTreatmentCard } from "./BeautyCenterTreatmentCard";

export default {
  title: "UI / Features /Beauty Center /Cards /BeautyCenterTreatmentCard",
  component: BeautyCenterTreatmentCard,
} as Meta<typeof BeautyCenterTreatmentCard>;

export const Default = {
  args: {
    category: "Facial",
    discount: randomNum(20),
    durationInMinutes: [40, 90],
    price: randomNum(80),
    title: "skin care treatment",
  },
};
