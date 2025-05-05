import { storybookSectionsTitle, PaymentMethodsSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / PaymentMethodsSection",
  component: PaymentMethodsSection,
} as Meta<typeof PaymentMethodsSection>;

export const Default = () => <PaymentMethodsSection />;
