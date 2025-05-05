import { StorybookImplemntationLayout, storybookSectionsTitle } from "utils";
import React from "react";
import { Meta } from "@storybook/react";
import { PasswordSection } from "@UI";

export default {
  title: "UI / sections / PasswordSection",
  component: PasswordSection,
} as Meta<typeof PasswordSection>;

export const Default = () => {
  return <PasswordSection />;
};
