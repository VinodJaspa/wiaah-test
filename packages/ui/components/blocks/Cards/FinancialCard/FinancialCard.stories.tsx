import { storybookCardsTitle, FinancialCard } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookCardsTitle + "FinancialCard",
  component: FinancialCard,
} as ComponentMeta<typeof FinancialCard>;

export const Default = () => (
  <FinancialCard
    amount={{
      amount: 15,
      currency: "CHF",
    }}
    title="card title"
  />
);
