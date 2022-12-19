import { storybookSectionsTitle, ProductManagementSection } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "ProductManagementSection",
  component: ProductManagementSection,
} as ComponentMeta<typeof ProductManagementSection>;

export const Default = () => <ProductManagementSection />;
