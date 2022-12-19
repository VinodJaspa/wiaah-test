import { storybookSectionsTitle, NewProductShippingOptions } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookSectionsTitle + "NewProductShippingOption",
  component: NewProductShippingOptions,
} as ComponentMeta<typeof NewProductShippingOptions>;

export const Default = () => <NewProductShippingOptions />;
