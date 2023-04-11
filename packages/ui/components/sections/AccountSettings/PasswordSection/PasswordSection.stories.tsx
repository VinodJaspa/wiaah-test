import {
  StorybookImplemntationLayout,
  storybookSectionsTitle,
} from "utils";
import React from "react";
import { ComponentMeta } from "@storybook/react";
import { PasswordSection } from "@UI";

export default {
  title: storybookSectionsTitle + "PasswordSection",
  component: PasswordSection,
} as ComponentMeta<typeof PasswordSection>;

export const Default = () => {
  return <PasswordSection />;
};
