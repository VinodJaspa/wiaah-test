import { storybookSectionsTitle, OrderDetailsSection } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "OrderDetailsSection",
  component: OrderDetailsSection,
} as ComponentMeta<typeof OrderDetailsSection>;

export const Default = () => <OrderDetailsSection />;
