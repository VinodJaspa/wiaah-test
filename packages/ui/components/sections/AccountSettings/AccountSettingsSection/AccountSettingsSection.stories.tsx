import React from "react";
import { StorybookImplemntationLayout, storybookSectionsTitle } from "utils";
import { AccountSettingsSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / AccountSettingsSection",
  component: AccountSettingsSection,
} as Meta<typeof AccountSettingsSection>;

export const Default = () => {
  return <AccountSettingsSection accountId="5" />;
};
