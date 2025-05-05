import { storybookSectionsTitle, OrderDetailsSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / OrderDetailsSection",
  component: OrderDetailsSection,
} as Meta<typeof OrderDetailsSection>;

export const Default = () => <OrderDetailsSection order={[]} />;
