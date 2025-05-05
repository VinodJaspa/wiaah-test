import React from "react";
import { Meta } from "@storybook/react";
import { ShopOpenPeriod, storybookDataFormatingTitle } from "@UI";
export default {
  title: "UI / blocks / Data Formating /ShopOpenPeriod",
  component: ShopOpenPeriod,
} as Meta<typeof ShopOpenPeriod>;

export const Default = () => <ShopOpenPeriod openFrom={10} openTo={16} />;
