import { storybookSectionsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { AccountDeletionSection } from "@UI";

export default {
  title: storybookSectionsTitle + "AccountDeletionSection",
  component: AccountDeletionSection,
} as ComponentMeta<typeof AccountDeletionSection>;

export const Default = () => {
  return <AccountDeletionSection />;
};
