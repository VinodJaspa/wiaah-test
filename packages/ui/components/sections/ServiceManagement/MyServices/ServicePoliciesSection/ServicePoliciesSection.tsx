import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useReactPubsub } from "react-pubsub";
import { NewServiceSchemas } from "validation";
import { FormikInput, Textarea } from "ui";

export interface ServicePoliciesInputSectionProps {
  onChange?: (data: Record<string, any>) => any;
  value?: Record<string, any>;
}

export const ServicePoliciesInputSection: React.FC<
  ServicePoliciesInputSectionProps
> = ({ onChange, value = {} }) => {
  const { emit } = useReactPubsub((keys) => keys.openFileUploadModal);
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-4">
      <Formik
        validationSchema={NewServiceSchemas.restaurantDetailsSchema}
        initialValues={value}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue }) => {
          onChange && onChange(values);
          return (
            <Form className="w-full flex flex-col gap-4">
              <span className="text-2xl font-semibold">
                {t("Service policies")}
              </span>
              <FormikInput
                name="policy_terms"
                as={Textarea}
                label={t("Policy Terms")}
                placeholder={t("Policy Terms")}
              />
              <FormikInput
                name="check_in_out_info"
                as={Textarea}
                label={
                  t("Check in") + " / " + t("Check out") + t("informations")
                }
                placeholder={t("The Description of the serivce")}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
