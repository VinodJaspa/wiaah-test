import { storybookSectionsTitle, ProductManagementSection } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / ProductManagementSection",
  component: ProductManagementSection,
} as Meta<typeof ProductManagementSection>;

export const Default = () => <ProductManagementSection />;
