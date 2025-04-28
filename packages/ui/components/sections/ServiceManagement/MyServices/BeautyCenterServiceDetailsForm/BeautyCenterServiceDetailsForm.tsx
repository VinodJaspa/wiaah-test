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
  InputProps,
  HashTagInput,
} from "@UI";
import { HiFolderAdd, HiVideoCamera } from "react-icons/hi";

export interface BeautyCenterServiceDetailsFormProps {
  onChange?: (data: Record<string, any>) => any;
}

export const BeautyCenterServiceDetailsForm: React.FC<
  BeautyCenterServiceDetailsFormProps
> = ({ onChange }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-4">
      <Formik
        validationSchema={NewServiceSchemas.restaurantDetailsSchema}
        initialValues={{} as Record<string, any>}
        onSubmit={() => { }}
      >
        {({ values, setFieldValue }) => {
          onChange && onChange(values);
          return (
            <Form className="w-full flex flex-col gap-4">
              <span className="text-2xl font-semibold">
                {t("Name & Description")}
              </span>
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

              <FormikInput<MultiChooseInputProps>
                placeholder={t("Duration of the treatment")}
                label={t("Duration (minutes)")}
                type="number"
                labelProps={{ className: "text-lg" }}
                name="duration"
              ></FormikInput>

              <Stack col divider={<Divider />}>
                <FormikInput<MultiChooseInputProps>
                  placeholder={t("Choose beauty center type")}
                  as={MultiChooseInput}
                  label={t("Beauty center type")}
                  labelProps={{ className: "text-lg" }}
                  onChange={(v) => setFieldValue("type", v)}
                  value={values["type"]}
                  suggestions={[
                    "Hair salon",
                    "Body care",
                    "Spa",
                    "Sauna",
                    "Manicure",
                    "massage & relaxation",
                  ]}
                  name="type"
                />
                <FormikInput<MultiChooseInputProps>
                  placeholder={t("Choose beauty salon")}
                  as={MultiChooseInput}
                  label={t("Beauty salon")}
                  labelProps={{ className: "text-lg" }}
                  onChange={(v) => setFieldValue("beauty_salon", v)}
                  value={values["beauty_salon"]}
                  suggestions={[
                    "Facial care & makeup",
                    "Skin care",
                    "Tatto shop",
                    "Aesthetic medicine",
                  ]}
                  name="type"
                />

                <FormikInput<MultiChooseInputProps>
                  placeholder={t("Choose treatment type")}
                  as={MultiChooseInput}
                  label={t("Treatment type")}
                  labelProps={{ className: "text-lg" }}
                  onChange={(v) => setFieldValue("treatment_type", v)}
                  value={values["treatment_type"]}
                  suggestions={[
                    "Body",
                    "Exfaliation",
                    "Micro-peeling",
                    "Body polish",
                    "Foot scrub",
                    "Bridal",
                    "Hair and makeup",
                    "Eyelash extensions",
                  ]}
                  name="type"
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
