import { Meta, StoryFn } from "@storybook/react";
import { UnDiscountedPriceDisplay } from "./UnDiscountedPriceDisplay";
import { storybookPartailsTitle } from "utils";

export default {
  title: "UI / partials / UnDiscountedPriceDisplay",
  component: UnDiscountedPriceDisplay,
} as Meta<typeof UnDiscountedPriceDisplay>;

export const Default = {
  args: {
    amount: 51,
    discount: 15,
  },
};
