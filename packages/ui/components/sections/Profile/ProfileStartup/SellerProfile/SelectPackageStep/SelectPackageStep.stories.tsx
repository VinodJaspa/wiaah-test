import { storybookSectionsTitle, SelectPackageStep } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / SelectPackageStep",
} as Meta<typeof SelectPackageStep>;

export const Default = () => (
  <SelectPackageStep shopType={""} onChange={() => {}} value="" />
);
