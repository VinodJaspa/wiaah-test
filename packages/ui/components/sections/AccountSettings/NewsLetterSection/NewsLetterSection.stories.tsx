import { storybookSectionsTitle, AccountNewsLetterSettingsSection } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "NewsLetterSection",
  component: AccountNewsLetterSettingsSection,
} as ComponentMeta<typeof AccountNewsLetterSettingsSection>;

export const Default = () => (
  <AccountNewsLetterSettingsSection userId="fake-3" />
);
