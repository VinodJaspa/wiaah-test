import { storybookSectionsTitle, WithdrawalSection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "WithdrawalSection",
  component: WithdrawalSection,
} as ComponentMeta<typeof WithdrawalSection>;

export const Default = () => <WithdrawalSection />;
