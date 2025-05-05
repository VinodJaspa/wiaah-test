import { storybookSectionsTitle, NewProductShippingOptions } from "@UI";
import { Meta } from "@storybook/react";
import * as Yup from "yup";

const shippingValidationSchema = Yup.object().shape({
  shippingMethods: Yup.array().of(Yup.string()).min(1, "select_at_least_one"),
});

export default {
  title: "UI / sections / NewProductShippingOption",
  component: NewProductShippingOptions,
} as Meta<typeof NewProductShippingOptions>;

export const Default = () => (
  <NewProductShippingOptions
    onValid={() => {}}
    validationSchema={shippingValidationSchema}
  />
);
