import { Meta, StoryFn } from "@storybook/react";
import { storybookServiceManagementCardsTitle } from "utils";
import { HealthCenterMyServiceCard } from "./HealthCenterMyServiceCard";

export default {
  title: "UI / Features /Service Management /Cards /HealthCenterMyServiceCard",
  component: HealthCenterMyServiceCard,
} as Meta<typeof HealthCenterMyServiceCard>;

export const Default = {
  args: {
    id: "132",
    description: "Health center description",
    provider: "Wiaah",
    thumbnail: "/place-1.jpg",
    title: "Health center title",
    type: "health_center",
  },
};
