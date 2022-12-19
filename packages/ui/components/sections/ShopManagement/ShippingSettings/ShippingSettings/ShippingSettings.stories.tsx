import { storybookSectionsTitle, ShippingSettings } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "ShippingSettingsSection",
  component: ShippingSettings,
} as ComponentMeta<typeof ShippingSettings>;

export const Default = () => <ShippingSettings />;
