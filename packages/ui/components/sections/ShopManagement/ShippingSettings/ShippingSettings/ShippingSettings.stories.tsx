import { storybookSectionsTitle, ShippingSettings } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / ShippingSettingsSection1",
  component: ShippingSettings,
} as Meta<typeof ShippingSettings>;

export const Default = () => <ShippingSettings />;
