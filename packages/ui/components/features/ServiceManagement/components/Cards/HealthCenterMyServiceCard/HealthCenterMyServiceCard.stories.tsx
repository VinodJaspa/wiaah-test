import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookServiceManagementCardsTitle } from "utils";
import { HealthCenterMyServiceCard } from "./HealthCenterMyServiceCard";

export default {
  title: storybookServiceManagementCardsTitle + "HealthCenterMyServiceCard",
  component: HealthCenterMyServiceCard,
} as ComponentMeta<typeof HealthCenterMyServiceCard>;

const template: ComponentStory<typeof HealthCenterMyServiceCard> = (args) => (
  <HealthCenterMyServiceCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  id: "132",
  description: "Health center description",
  provider: "Wiaah",
  thumbnail: "/place-1.jpg",
  title: "Health center title",
  type: "health_center",
};
