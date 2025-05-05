import { storybookSectionsTitle, TransactionsHistorySection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / TransactionsHistorySection",
  component: TransactionsHistorySection,
} as Meta<typeof TransactionsHistorySection>;

export const Default = () => <TransactionsHistorySection />;
