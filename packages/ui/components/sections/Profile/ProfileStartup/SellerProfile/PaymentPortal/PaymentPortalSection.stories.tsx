import { storybookSectionsTitle, PaymentPortal } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / PaymentPortal",
} as Meta<typeof PaymentPortal>;

export const Default = () => <PaymentPortal />;
