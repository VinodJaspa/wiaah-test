import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useReactPubsub } from "react-pubsub";
import { FileRes } from "utils";
import { NewServiceSchemas } from "validation";
import {
  ChooseWithInput,
  MultiChooseInput,
  FormikInput,
  Textarea,
  Stack,
  Divider,
  MultiChooseInputProps,
  MediaUploadModal,
  Select,
  SelectOption,
} from "ui";
import { HiFolderAdd, HiVideoCamera } from "react-icons/hi";

export interface ServicePoliciesSectionProps {
  onChange?: (data: Record<string, any>) => any;
}

export const ServicePoliciesSection: React.FC<ServicePoliciesSectionProps> = ({
  onChange,
}) => {
  const { emit } = useReactPubsub((keys) => keys.openFileUploadModal);
  const [images, setImages] = React.useState<FileRes[]>([]);
  const [videos, setVideos] = React.useState<string[]>([]);
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-4">
      <Formik
        validationSchema={NewServiceSchemas.restaurantDetailsSchema}
        initialValues={{}}
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
