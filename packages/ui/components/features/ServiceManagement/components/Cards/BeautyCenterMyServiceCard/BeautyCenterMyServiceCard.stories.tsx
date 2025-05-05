import { Meta, StoryFn } from "@storybook/react";
import { BeautyCenterMyServiceCard } from "./BeautyCenterMyServiceCard";
import { storybookServiceManagementCardsTitle } from "utils";

export default {
  title: "UI / Features /Service Management /Cards /BeautyCenterMyServiceCard",
  component: BeautyCenterMyServiceCard,
} as Meta<typeof BeautyCenterMyServiceCard>;

export const Default = {
  args: {
    id: "13",
    description: "Beauty Center Description",
    provider: "wiaah",
    thumbnail: "/place-2.jpg",
    title: "Wiaah Beauty",
    type: "beauty_center",
  },
};
