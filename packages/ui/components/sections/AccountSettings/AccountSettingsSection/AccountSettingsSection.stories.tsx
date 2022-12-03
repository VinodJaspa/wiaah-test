import React from "react";
import { StorybookImplemntationLayout, storybookSectionsTitle } from "ui/utils";
import { AccountSettingsSection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "AccountSettingsSection",
  component: AccountSettingsSection,
} as ComponentMeta<typeof AccountSettingsSection>;

export const Default = () => {
  return <AccountSettingsSection />;
};
