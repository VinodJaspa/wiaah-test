import React from "react";
import { useTranslation } from "react-i18next";
import { FormOptionType, PriceType } from "types";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TranslationText } from "@UI";

export interface NewProductShippingOptions {
  onValid: (values: Record<string, any>) => any;
  validationSchema: Yup.AnySchema;
}

export const NewProductShippingOptions: React.FC<NewProductShippingOptions> = ({
  onValid,
  validationSchema,
}) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        shippingMethods: [] as string[], // Manage selected checkboxes as an array
      }}
      validationSchema={validationSchema} // Use passed schema or fallback to local schema
      onSubmit={() => { }}
    >
      {({ values, setFieldValue, errors, touched }) => {
        onValid && onValid(values);

        return (
          <Form className="flex flex-col gap-4">
            <h1 className="text-xl font-bold">
              {t("shipping_method", "Shipping Method")}
            </h1>

            {shippingMethods.map((method, i) => (
              <div key={i} className="flex gap-4 items-center">
                <Field
                  type="checkbox"
                  name="shippingMethods"
                  value={method.value} // Unique value for each shipping method
                  checked={values.shippingMethods.includes(method.value)} // Ensure checkbox is checked based on value
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newArray = e.target.checked
                      ? [...values.shippingMethods, method.value] // Add to array if checked
                      : values.shippingMethods.filter(
                        (value) => value !== method.value
                      ); // Remove from array if unchecked
                    setFieldValue("shippingMethods", newArray);
                  }}
                />
                <span className="flex gap-1">
                  <TranslationText translationObject={method.name} />
                  {method.period && (
                    <span>
                      ({method.period.from}-{method.period.to}{" "}
                      {t("days", "days")})
                    </span>
                  )}
                  {method.price && (
                    <span>
                      {method.price.amount} {method.price.currency}
                    </span>
                  )}
                </span>
              </div>
            ))}

            {touched.shippingMethods && errors.shippingMethods && (
              <div className="text-red-500">{errors.shippingMethods}</div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

type ShippingMethod = FormOptionType & {
  price?: PriceType;
  period?: {
    from: number;
    to: number;
  };
};

const shippingMethods: ShippingMethod[] = [
  {
    name: {
      translationKey: "european_union_ups",
      fallbackText: "European Union UPS",
    },
    value: "europeanUnion",
    price: {
      amount: 25,
      currency: "CHF",
    },
    period: {
      from: 1,
      to: 3,
    },
  },
  {
    name: {
      translationKey: "international",
      fallbackText: "International",
    },
    value: "international",
    price: {
      amount: 50,
      currency: "CHF",
    },
    period: {
      from: 1,
      to: 3,
    },
  },
  {
    name: {
      translationKey: "self_pickup",
      fallbackText: "Self Pickup",
    },
    value: "selfPickup",
  },
];
