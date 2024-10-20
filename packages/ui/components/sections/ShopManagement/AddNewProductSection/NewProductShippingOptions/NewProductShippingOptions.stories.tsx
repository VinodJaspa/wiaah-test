import { storybookSectionsTitle, NewProductShippingOptions } from "@UI";
import { ComponentMeta } from "@storybook/react";
import * as Yup from "yup";

const shippingValidationSchema = Yup.object().shape({
  shippingMethods: Yup.array().of(Yup.string()).min(1, "select_at_least_one"),
});

export default {
  title: storybookSectionsTitle + "NewProductShippingOption",
  component: NewProductShippingOptions,
} as ComponentMeta<typeof NewProductShippingOptions>;

export const Default = () => (
  <NewProductShippingOptions
    onValid={() => { }}
    validationSchema={shippingValidationSchema}
  />
);
