import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useReactPubsub } from "react-pubsub";
import { FileRes } from "utils";
import { NewServiceSchemas } from "validation";
import {
  FormikInput,
  Textarea,
  Stack,
  MultiChooseInput,
  ChooseWithInput,
  Divider,
  MultiChooseInputProps,
  MediaUploadModal,
  SelectProps,
  Select,
  SelectOption,
  InputProps,
  HashTagInput,
  Input,
  Checkbox,
  InputGroup,
} from "@UI";
import { HiFolderAdd, HiVideoCamera } from "react-icons/hi";

export interface VehicleServiceDetailsFormProps {
  onChange?: (data: Record<string, any>) => any;
}

export const VehicleServiceDetailsForm: React.FC<
  VehicleServiceDetailsFormProps
> = ({ onChange }) => {
const { t } = useTranslation();
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

              <Stack col divider={<Divider />}>
                <FormikInput<MultiChooseInputProps>
                  placeholder={t("Choose vehicle type")}
                  as={Select}
                  label={t("Vehicle type")}
                  labelProps={{ className: "text-lg" }}
                  onChange={(v) => setFieldValue("vehicle_type", v)}
                  value={values["vehicle_type"]}
                  suggestions={["Boat", "Car", "Bike"]}
                  name="vehicle_type"
                >
                  <SelectOption value={`${0}`}>{t("Car")}</SelectOption>
                  <SelectOption value={`${100}`}>{"Bike"}</SelectOption>
                  <SelectOption value={`${200}`}>{"$200"}</SelectOption>
                </FormikInput>

                <FormikInput<SelectProps>
                  placeholder={t("Choose security deposit")}
                  as={Select}
                  label={t("Security deposit")}
                  labelProps={{ className: "text-lg" }}
                  onChange={(v) => setFieldValue("speaking_language", v)}
                  value={values["security_deposit"]}
                  name="speicality_types"
                >
                  <SelectOption value={`${0}`}>{t("no")}</SelectOption>
                  <SelectOption value={`${100}`}>{"$100"}</SelectOption>
                  <SelectOption value={`${200}`}>{"$200"}</SelectOption>
                </FormikInput>
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

              <FormikInput
                type="number"
                name="seats"
                label={t("Number of Seats")}
              />
              <Input type="number" name="speed" label={t("Max seepd (KM/h)")} />
              <Checkbox>{t("GPS Available")}</Checkbox>
              <Checkbox>{t("Air Condition")}</Checkbox>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
