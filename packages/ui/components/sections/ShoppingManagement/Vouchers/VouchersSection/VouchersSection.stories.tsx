import { storybookSectionsTitle, VouchersSection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "VouchersSection",
  component: VouchersSection,
} as ComponentMeta<typeof VouchersSection>;

export const Default = () => <VouchersSection />;
