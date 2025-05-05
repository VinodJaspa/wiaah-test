import { Meta, StoryFn } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import { PriceLevelDisplay } from "./PriceLevelDisplay";

export default {
  title: "UI / partials / PriceLevelDisplay",
  component: PriceLevelDisplay,
} as Meta<typeof PriceLevelDisplay>;

export const Default = {
  args: {
    amount: 155,
    levels: [50, 100],
  },
};
