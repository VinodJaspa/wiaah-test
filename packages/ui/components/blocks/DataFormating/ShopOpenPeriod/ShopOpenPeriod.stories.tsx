import React from "react";
import { ComponentMeta } from "@storybook/react";
import { ShopOpenPeriod, storybookDataFormatingTitle } from "@UI";
export default {
  title: storybookDataFormatingTitle + "ShopOpenPeriod",
  component: ShopOpenPeriod,
} as ComponentMeta<typeof ShopOpenPeriod>;

export const Default = () => <ShopOpenPeriod openFrom={10} openTo={16} />;
