import { storybookSectionsTitle, WithdrawalSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / WithdrawalSection",
  component: WithdrawalSection,
} as Meta<typeof WithdrawalSection>;

export const Default = () => <WithdrawalSection />;
