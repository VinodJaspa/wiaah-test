import { storybookSectionsTitle, ProductOptions } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "NewProductDiscountOptionsSection",
  component: ProductOptions,
} as ComponentMeta<typeof ProductOptions>;

export const Default = () => <ProductOptions />;
