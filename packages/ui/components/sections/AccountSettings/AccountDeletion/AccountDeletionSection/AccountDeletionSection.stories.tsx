import { storybookSectionsTitle } from "ui/utils";
import { ComponentMeta } from "@storybook/react";
import { AccountDeletionSection } from "ui";

export default {
  title: storybookSectionsTitle + "AccountDeletionSection",
  component: AccountDeletionSection,
} as ComponentMeta<typeof AccountDeletionSection>;

export const Default = () => {
  return <AccountDeletionSection />;
};
