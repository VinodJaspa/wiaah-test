import { storybookSectionsTitle, ShippingSettingsSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / ShippingSettingsSection",
  component: ShippingSettingsSection,
} as Meta<typeof ShippingSettingsSection>;

export const Default = () => <ShippingSettingsSection />;
