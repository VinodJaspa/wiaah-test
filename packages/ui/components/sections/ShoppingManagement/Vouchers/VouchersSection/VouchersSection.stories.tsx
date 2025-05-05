import { storybookSectionsTitle, VouchersSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / VouchersSection",
  component: VouchersSection,
} as Meta<typeof VouchersSection>;

export const Default = () => <VouchersSection />;
