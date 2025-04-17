import { storybookSectionsTitle, ProductOptions } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / sections / NewProductDiscountOptionsSection",
  component: ProductOptions,
} as Meta<typeof ProductOptions>;

export const Default = () => <ProductOptions />;
