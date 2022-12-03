import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import { PriceLevelDisplay } from "./PriceLevelDisplay";

export default {
  title: storybookPartailsTitle + "PriceLevelDisplay",
  component: PriceLevelDisplay,
} as ComponentMeta<typeof PriceLevelDisplay>;

const template: ComponentStory<typeof PriceLevelDisplay> = (args) => (
  <PriceLevelDisplay {...args} />
);

export const Default = template.bind({});
Default.args = {
  amount: 155,
  levels: [50, 100],
};
