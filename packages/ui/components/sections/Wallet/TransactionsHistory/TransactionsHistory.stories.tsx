import { storybookSectionsTitle, TransactionsHistorySection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "TransactionsHistorySection",
  component: TransactionsHistorySection,
} as ComponentMeta<typeof TransactionsHistorySection>;

export const Default = () => <TransactionsHistorySection />;
