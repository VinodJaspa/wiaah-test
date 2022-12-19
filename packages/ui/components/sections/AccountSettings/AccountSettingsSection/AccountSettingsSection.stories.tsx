import React from "react";
import {
  StorybookImplemntationLayout,
  storybookSectionsTitle,
} from "@UI/utils";
import { AccountSettingsSection } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "AccountSettingsSection",
  component: AccountSettingsSection,
} as ComponentMeta<typeof AccountSettingsSection>;

export const Default = () => {
  return <AccountSettingsSection />;
};
