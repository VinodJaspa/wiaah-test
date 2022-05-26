import { storybookSectionsTitle, ShippingSettingsSection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "ShippingSettingsSection",
} as ComponentMeta<typeof ShippingSettingsSection>;

export const Default = () => <ShippingSettingsSection />;
