import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useReactPubsub } from "react-pubsub";
import { FileRes } from "utils";
import { NewServiceSchemas } from "validation";
import {
  FormikInput,
  Textarea,
  MultiChooseInput,
  MultiChooseInputProps,
  MediaUploadModal,
  ChooseWithInput,
  Divider,
  InputProps,
  Stack,
  HashTagInput,
} from "ui";
import { HiFolderAdd, HiVideoCamera } from "react-icons/hi";

export interface HealthCenterServiceDetailsFormProps {
  onChange?: (data: Record<string, any>) => any;
}

export const HealthCenterServiceDetailsForm: React.FC<
  HealthCenterServiceDetailsFormProps
> = ({ onChange }) => {
  const { emit } = useReactPubsub((keys) => keys.openFileUploadModal);
  const [images, setImages] = React.useState<FileRes[]>([]);
  const [videos, setVideos] = React.useState<string[]>([]);
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-4">
      <Formik
        validationSchema={NewServiceSchemas.restaurantDetailsSchema}
        initialValues={{} as Record<string, any>}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue }) => {
          onChange && onChange(values);
          return (
            <Form className="w-full flex flex-col gap-4">
              <span className="text-2xl font-semibold">
                {t("Name & Description")}
              </span>
              <FormikInput
                name="name"
                as={Textarea}
                placeholder={t("The name of the serivce")}
              />
              <FormikInput
                name="description"
                as={Textarea}
                placeholder={t("The Description of the serivce")}
              />
              <FormikInput
                name={"numOfStars"}
                placeholder={t("Number of stars")}
              />
              <FormikInput
                name="metaTagDescription"
                className="bg-white"
                as={Textarea}
                placeholder={t("Meta Tag Description")}
              />
              <FormikInput
                name="metaTagKeyword"
                className="bg-white"
                as={Textarea}
                placeholder={t("Meta Tag Keyword")}
              />
              <FormikInput
                name="serviceTag"
                className="bg-white"
                as={Textarea}
                placeholder={t("Service Tag")}
              />
              <HashTagInput />
              <span className="text-2xl font-semibold">
                {t("Price & Attributes")}
              </span>
              <FormikInput<InputProps>
                type={"number"}
                min={1}
                name="vat"
                placeholder={t("VAT %")}
              />
              <Stack col divider={Divider}>
                <FormikInput<MultiChooseInputProps>
                  placeholder={t("Choose Speciality types")}
                  as={MultiChooseInput}
                  label={t("Speciality types")}
                  labelProps={{ className: "text-lg" }}
                  onChange={(v) => setFieldValue("speciality_types", v)}
                  value={values["speciality_types"]}
                  suggestions={["Ophtalmo", "Dentist"]}
                  name="speicality_types"
                />

                <FormikInput<MultiChooseInputProps>
                  placeholder={t("Choose Speciality types")}
                  as={MultiChooseInput}
                  label={t("Speciality types")}
                  labelProps={{ className: "text-lg" }}
                  onChange={(v) => setFieldValue("speaking_language", v)}
                  value={values["speaking_language"]}
                  suggestions={["Arabian", "English", "French"]}
                  name="speicality_types"
                />
              </Stack>

              <ChooseWithInput
                title={t("Cancel fees")}
                name="cancelFees"
                onOptionChange={(opt) => setFieldValue("cancelFees", opt)}
                options={[
                  {
                    title: t("Free"),
                    key: "free",
                    input: null,
                  },
                  {
                    title: t("Paid"),
                    key: "paid",
                    input: { placeholder: "$" },
                  },
                ]}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
