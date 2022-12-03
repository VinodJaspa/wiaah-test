import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookBeautyCenterListsTitle } from "utils";
import { BeautyCenterTreatmentsList } from "./BeautyCenterTreatmentsList";

export default {
  title: storybookBeautyCenterListsTitle + "BeautyCenterTreatmentsList",
  component: BeautyCenterTreatmentsList,
} as ComponentMeta<typeof BeautyCenterTreatmentsList>;

const template: ComponentStory<typeof BeautyCenterTreatmentsList> = (args) => (
  <BeautyCenterTreatmentsList {...args} />
);

export const Default = template.bind({});
Default.args = {
  treatments: [...Array(5)].map((treat, i) => ({
    category: "Facial",
    discount: randomNum(20),
    durationInMinutes: [40, 90],
    price: randomNum(80),
    title: "skin care treatment",
  })),
  cancelation: [
    {
      cost: 0,
      duration: 0,
      id: "1",
    },
    {
      cost: 50,
      duration: 0,
      id: "2",
    },
    {
      cost: 25,
      duration: 8,
      id: "3",
    },
  ],
};
