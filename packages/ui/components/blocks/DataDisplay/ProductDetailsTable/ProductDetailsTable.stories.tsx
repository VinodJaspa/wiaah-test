import { storybookBlocksTitle, ProductDetailsTable } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "ProductDetailsTable",
  component: ProductDetailsTable,
} as ComponentMeta<typeof ProductDetailsTable>;

export const Default = () => <ProductDetailsTable />;
