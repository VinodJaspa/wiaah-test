import { storybookSectionsTitle, PaymentPortal } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "PaymentPortal",
} as ComponentMeta<typeof PaymentPortal>;

export const Default = () => <PaymentPortal />;
