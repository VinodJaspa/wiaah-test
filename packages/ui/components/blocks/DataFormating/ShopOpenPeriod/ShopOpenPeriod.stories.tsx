import React from "react";
import { ComponentMeta } from "@storybook/react";
import { ShopOpenPeriod, storybookDataFormatingTitle } from "ui";
export default {
  title: storybookDataFormatingTitle + "ShopOpenPeriod",
  component: ShopOpenPeriod,
} as ComponentMeta<typeof ShopOpenPeriod>;

export const Default = () => <ShopOpenPeriod openFrom={10} openTo={16} />;
