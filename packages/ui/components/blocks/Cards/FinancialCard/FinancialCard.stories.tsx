import { storybookCardsTitle, FinancialCard } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / cards /FinancialCard",
  component: FinancialCard,
} as Meta<typeof FinancialCard>;

export const Default = () => (
  <FinancialCard
    amount={{
      amount: 15,
      currency: "CHF",
    }}
    title="card title"
  />
);
