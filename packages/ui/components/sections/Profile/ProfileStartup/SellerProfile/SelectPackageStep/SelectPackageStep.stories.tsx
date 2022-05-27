import { storybookSectionsTitle, SelectPackageStep } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "SelectPackageStep",
} as ComponentMeta<typeof SelectPackageStep>;

export const Default = () => <SelectPackageStep />;
