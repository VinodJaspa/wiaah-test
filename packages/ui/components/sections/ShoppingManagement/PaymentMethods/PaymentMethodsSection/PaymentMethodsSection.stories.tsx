import { storybookSectionsTitle, PaymentMethodsSection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "PaymentMethodsSection",
  component: PaymentMethodsSection,
} as ComponentMeta<typeof PaymentMethodsSection>;

export const Default = () => <PaymentMethodsSection />;
