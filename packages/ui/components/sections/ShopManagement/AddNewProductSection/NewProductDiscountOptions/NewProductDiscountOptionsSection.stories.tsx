import { storybookSectionsTitle, NewProductDiscountOptions } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "NewProductDiscountOptionsSection",
  component: NewProductDiscountOptions,
} as ComponentMeta<typeof NewProductDiscountOptions>;

export const Default = () => <NewProductDiscountOptions />;
