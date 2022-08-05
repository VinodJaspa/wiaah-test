import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookBeautyCenterCardsTitle } from "utils";
import { BeautyCenterTreatmentCard } from "./BeautyCenterTreatmentCard";

export default {
  title: storybookBeautyCenterCardsTitle + "BeautyCenterTreatmentCard",
  component: BeautyCenterTreatmentCard,
} as ComponentMeta<typeof BeautyCenterTreatmentCard>;

const template: ComponentStory<typeof BeautyCenterTreatmentCard> = (args) => (
  <BeautyCenterTreatmentCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  category: "Facial",
  discount: randomNum(20),
  durationInMinutes: [40, 90],
  price: randomNum(80),
  title: "skin care treatment",
};
