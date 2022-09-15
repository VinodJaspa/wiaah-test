import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiFolderAdd, HiVideoCamera } from "react-icons/hi";
import { useReactPubsub } from "react-pubsub";
import {
  MultiChooseInput,
  MultiChooseInputProps,
  FormikInput,
  Textarea,
  Select,
  SelectProps,
  SelectOption,
  ChooseWithInput,
  MediaUploadModal,
  Stack,
  Divider,
  InputProps,
  HashTagInput,
} from "ui";
import { FileRes } from "utils";
import { NewServiceSchemas } from "validation";

const MAX_PRODUCTS_IMAGE = 4;

export interface RestaurantServiceDetailsFormProps {
  onChange?: (data: Record<string, any>) => any;
}

export const RestaurantServiceDetailsForm: React.FC<
  RestaurantServiceDetailsFormProps
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
                  placeholder={t("Choose establishment type")}
                  as={MultiChooseInput}
                  label={t("Establishment Type")}
                  labelProps={{ className: "text-lg" }}
                  onChange={(v) => setFieldValue("establishment_type", v)}
                  value={values["establishment_type"]}
                  suggestions={[
                    "Restaurant",
                    "Quick Bites",
                    "Coffe & tea",
                    "Bars & Pubs",
                    "Dine With a Local Chef",
                    "Speciality Food market",
                    "Delivery only",
                  ]}
                  name="establishment_type"
                />

                <FormikInput<MultiChooseInputProps>
                  placeholder={t("Choose cuisines type")}
                  label={t("Cuisines type")}
                  labelProps={{ className: "text-lg" }}
                  as={MultiChooseInput}
                  onChange={(v) => setFieldValue("cuisines_type", v)}
                  value={values["cuisines_type"]}
                  suggestions={[
                    "Asian",
                    "French",
                    "Italian",
                    "Indian",
                    "Traditional",
                    "Egyption",
                  ]}
                  name="cuisines_type"
                />

                <FormikInput<MultiChooseInputProps>
                  placeholder={t("Choose Setting and ambiance type")}
                  as={MultiChooseInput}
                  label={t("Setting and ambiance")}
                  labelProps={{ className: "text-lg" }}
                  onChange={(v) => setFieldValue("setting_&_ambiance", v)}
                  value={values["setting_&_ambiance"]}
                  suggestions={[
                    "For Business",
                    "For Friends",
                    "For Family",
                    "For Lovers",
                  ]}
                  name="setting_&_ambinace"
                />

                <FormikInput<MultiChooseInputProps>
                  placeholder={t("Choose your dishes")}
                  label={t("Dishes")}
                  labelProps={{ className: "text-lg" }}
                  as={MultiChooseInput}
                  onChange={(v) => setFieldValue("dishes", v)}
                  value={values["dishes"]}
                  suggestions={[
                    "Tapes",
                    "Pizza",
                    "Crepes",
                    "Burger",
                    "Seafood",
                    "Wok",
                    "Sushi",
                  ]}
                  name="dishes"
                />

                <FormikInput<MultiChooseInputProps>
                  placeholder={t("Choose your payment methods")}
                  label={t("Payment methods")}
                  labelProps={{ className: "text-lg" }}
                  as={MultiChooseInput}
                  onChange={(v) => setFieldValue("payment_methods", v)}
                  value={values["payment_methods"]}
                  suggestions={[
                    "Credit Card",
                    "Visa",
                    "Mastercard",
                    "Check",
                    "Cash",
                  ]}
                  name="payment_methods"
                />
              </Stack>
              <FormikInput<SelectProps>
                placeholder={t("Choose Michelin Guide")}
                label={t("Michelin Guide")}
                labelProps={{ className: "text-lg" }}
                as={Select}
                name="michelin_guide"
              >
                <SelectOption value={"guide"}>
                  {t("Michelin guide")}
                </SelectOption>
                <SelectOption value={"1star"}>
                  {t("Michelin 1 star")}
                </SelectOption>
                <SelectOption value={"2star"}>
                  {t("Michelin 2 stars")}
                </SelectOption>
                <SelectOption value={"3star"}>
                  {t("Michelin 3 stars")}
                </SelectOption>
                <SelectOption value={"bib_gourmand"}>
                  {t("Michelin Bib Gourmand")}
                </SelectOption>
              </FormikInput>

              <FormikInput<SelectProps>
                placeholder={t("Choose your special offer")}
                label={t("Special offer")}
                labelProps={{ className: "text-lg" }}
                as={Select}
                name="special_offer"
              >
                {[...Array(7)].map((_, i) => (
                  <SelectOption value={i * 10}>
                    `-{i * 10}% {t("on the menu")}`
                  </SelectOption>
                ))}
              </FormikInput>

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
