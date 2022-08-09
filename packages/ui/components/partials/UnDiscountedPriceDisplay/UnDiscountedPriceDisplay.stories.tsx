import { ComponentMeta, ComponentStory } from "@storybook/react";
import { UnDiscountedPriceDisplay } from "./UnDiscountedPriceDisplay";
import { storybookPartailsTitle } from "utils";

export default {
  title: storybookPartailsTitle + "UnDiscountedPriceDisplay",
  component: UnDiscountedPriceDisplay,
} as ComponentMeta<typeof UnDiscountedPriceDisplay>;

const template: ComponentStory<typeof UnDiscountedPriceDisplay> = (args) => (
  <UnDiscountedPriceDisplay {...args} />
);

export const Default = template.bind({});
Default.args = {
  amount: 51,
  discount: 15,
};
