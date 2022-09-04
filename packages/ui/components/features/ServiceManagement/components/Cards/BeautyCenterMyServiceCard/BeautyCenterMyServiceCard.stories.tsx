import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BeautyCenterMyServiceCard } from "./BeautyCenterMyServiceCard";
import { storybookServiceManagementCardsTitle } from "utils";

export default {
  title: storybookServiceManagementCardsTitle + "BeautyCenterMyServiceCard",
  component: BeautyCenterMyServiceCard,
} as ComponentMeta<typeof BeautyCenterMyServiceCard>;

const template: ComponentStory<typeof BeautyCenterMyServiceCard> = (args) => (
  <BeautyCenterMyServiceCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  id: "13",
  description: "Beauty Center Description",
  provider: "wiaah",
  thumbnail: "/place-2.jpg",
  title: "Wiaah Beauty",
  type: "beauty_center",
};
