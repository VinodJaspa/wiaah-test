import { storybookSectionsTitle, AccountNewsLetterSettingsSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / NewsLetterSection",
  component: AccountNewsLetterSettingsSection,
} as Meta<typeof AccountNewsLetterSettingsSection>;

export const Default = () => (
  <AccountNewsLetterSettingsSection userId="fake-3" />
);
