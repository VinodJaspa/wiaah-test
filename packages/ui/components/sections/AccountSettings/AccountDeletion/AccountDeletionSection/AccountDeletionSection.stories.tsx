import { storybookSectionsTitle } from "utils";
import { Meta } from "@storybook/react";
import { AccountDeletionSection } from "@UI";

export default {
  title: "UI / sections / AccountDeletionSection",
  component: AccountDeletionSection,
} as Meta<typeof AccountDeletionSection>;

export const Default = () => {
  return <AccountDeletionSection />;
};
