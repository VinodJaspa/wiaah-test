import { useTranslation } from "react-i18next";
import { FileRes } from "utils";
import React from "react";
import {
  Textarea,
  HashTagInput,
  ChooseWithInput,
  Select,
  SelectProps,
  SelectOption,
  InputProps,
  FormikInput,
  useGetHotelAmenitesQuery,
  MultiChooseInput,
  MultiChooseInputProps,
  Stack,
  Divider,
  CancelationPoliciesListInput,
  CancelationPoliciesListInputProps,
  ServiceExtrasInputList,
  ServiceExtrasInputListProps,
  Switch,
  MediaUploadModal,
  CountInput,
  HotelBedsInput,
  DailyPriceInput,
  HoliydayRentalsBoundedStayNightsInput,
  HoliydayRentalsBoundedStayNightsInputProps,
  DateInput,
  DateDayComponentProps,
  AspectRatio,
  DateInputProps,
  Button,
} from "ui";
import { Form, Formik } from "formik";
import { HiFolderAdd, HiVideoCamera } from "react-icons/hi";
import { NewServiceSchemas } from "validation";
import { useReactPubsub } from "react-pubsub";

export interface HolidayRantalsDetailsProps {
  onChange?: (data: Record<string, any>) => any;
}

const MAX_PRODUCTS_IMAGE = 4;

export const HolidayRentalsGeneralDetailsForm: React.FC<
  HolidayRantalsDetailsProps
> = ({ onChange }) => {
  const [images, setImages] = React.useState<FileRes[]>([]);
  const [videos, setVideos] = React.useState<string[]>([]);
  const { t } = useTranslation();
  const { data: res } = useGetHotelAmenitesQuery();
  const { emit } = useReactPubsub((keys) => keys.openLoginPopup);

  return (
    <div className="w-full flex flex-col gap-4">
      <Formik
        validationSchema={NewServiceSchemas.serviceGeneralDetailsSchema}
        initialValues={
          {
            beds: [
              {
                required: true,
                name: "Double",
                amount: 0,
              },
              {
                required: true,
                name: "Queen",
                amount: 0,
              },
              {
                required: true,
                name: "Single",
                amount: 0,
              },
              {
                required: true,
                name: "Sofa bed",
                amount: 0,
              },
            ],
          } as Record<string, any>
        }
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
              <FormikInput<SelectProps>
                placeholder={t("Choose property type")}
                as={Select}
                name="property_type"
              >
                <SelectOption value={"hotel"}>{t("Hotel")}</SelectOption>
                <SelectOption value={"house"}>{t("House")}</SelectOption>
                <SelectOption value={"flat"}>{t("Flatt")}</SelectOption>
                <SelectOption value={"guest_house"}>
                  {t("Guest house")}
                </SelectOption>
                <SelectOption value={"hostel"}>{t("Hostel")}</SelectOption>
              </FormikInput>
              <FormikInput<SelectProps>
                placeholder={t("Choose type of place")}
                as={Select}
                name="type_of_place"
              >
                <SelectOption value={"private_appartement"}>
                  {t("Private appartement")}
                </SelectOption>
                <SelectOption value={"private_room"}>
                  {t("Private room")}
                </SelectOption>
                <SelectOption value={"shared_room"}>
                  {t("Shared room")}
                </SelectOption>
              </FormikInput>
              <FormikInput<SelectProps>
                placeholder={t("Choose number of rooms")}
                as={Select}
                name="number_of_rooms"
              >
                {[...Array(5)].map((_, i) => (
                  <SelectOption value={i + 1}>
                    {`${i + 1} ${i === 0 ? "room" : "rooms"}`}
                  </SelectOption>
                ))}
              </FormikInput>
              <FormikInput<SelectProps>
                placeholder={t("Choose number of beds")}
                as={Select}
                name="number_of_beds"
              >
                {[...Array(5)].map((_, i) => (
                  <SelectOption value={i + 1}>
                    {`${i + 1} ${i === 0 ? "bed" : "beds"}`}
                  </SelectOption>
                ))}
              </FormikInput>
              <FormikInput
                name="priceByNight"
                placeholder={t("Price by night")}
              />

              <ChooseWithInput
                title={t("Deposit")}
                name="deposit"
                onOptionChange={(opt) => setFieldValue("deposit", opt)}
                options={[
                  {
                    title: t("no", "No"),
                    key: "no",
                    input: null,
                  },
                  {
                    title: t("yes", "Yes"),
                    key: "yes",
                    input: { placeholder: "$" },
                  },
                ]}
              />
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

              <Stack col divider={Divider}>
                <FormikInput
                  name="roomTitle"
                  placeholder={t("Enter a room title")}
                  label={t("Room title")}
                />
                <div className="flex gap-2">
                  <p>{t("Enable Daily Price")}</p>
                  <Switch
                    checked={values["isDailyPrice"]}
                    onChange={(checked) =>
                      setFieldValue("isDailyPrice", checked)
                    }
                  />
                </div>
                {values["isDailyPrice"] === true ? (
                  <DailyPriceInput
                    value={values["daily_price"]}
                    onChange={(data) => setFieldValue("daily_price", data)}
                  />
                ) : (
                  <FormikInput
                    name="price"
                    type={"number"}
                    placeholder={t("Price by night")}
                    label={t("Room price by night")}
                  />
                )}

                <div className="flex gap-4">
                  <HotelBedsInput
                    value={values["beds"]}
                    onChange={(beds) => setFieldValue("beds", beds)}
                  />
                  <div className="flex flex-col gap-4 w-full">
                    <p className="text-gray-400">{t("Bathrooms")}</p>
                    <div className="flex text-xl items-center gap-2">
                      <p className="font-semibold">{t("Bathrooms")}</p>
                      <CountInput
                        count={values["bathrooms"]}
                        onCountChange={(c) => setFieldValue("bathrooms", c)}
                      />
                    </div>
                  </div>
                </div>

                <FormikInput<MultiChooseInputProps>
                  as={MultiChooseInput}
                  placeholder={t("choose amenites")}
                  onChange={(amis) => setFieldValue("common_amenites", amis)}
                  value={values["common_amenites"]}
                  name="common_amenites"
                  suggestions={res?.data.amenites}
                  label={t("Room common amenites")}
                />

                <FormikInput<CancelationPoliciesListInputProps>
                  as={CancelationPoliciesListInput}
                  onChange={(v) => setFieldValue("cancelation_policies", v)}
                  value={values["cancelation_policies"]}
                  label={t("Cancelation Policies")}
                  name="cancelation_policies"
                />

                <FormikInput<ServiceExtrasInputListProps>
                  name="extras"
                  label={t("Extras")}
                  as={ServiceExtrasInputList}
                  onChange={(v) => setFieldValue("extras", v)}
                  value={values["extras"]}
                />

                <FormikInput<HoliydayRentalsBoundedStayNightsInputProps>
                  as={HoliydayRentalsBoundedStayNightsInput}
                  name={"stayNights"}
                  label={t("Stay nights")}
                  onChange={(data) => setFieldValue("stayNights", data)}
                  value={values["stayNights"]}
                />
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-between">
                    <p className="font-semibold">{t("Rental Availability")}</p>
                    <Button
                      onClick={() => setFieldValue("fill", !values["fill"])}
                      outline
                    >
                      {values["fill"]
                        ? t("Fill this month")
                        : t("Clear this month")}
                    </Button>
                  </div>
                  <FormikInput<DateInputProps>
                    as={DateInput}
                    className="w-[100%]"
                    name="rentalAvailability"
                    multi
                    value={[new Date().toString()]}
                    onMultiChange={
                      (dates) => {}
                      // setFieldValue("rentalAvailability", dates)
                    }
                    dayComponent={({
                      active,
                      currentMonth,
                      dayNum,
                    }: DateDayComponentProps) => (
                      <AspectRatio ratio={3 / 4}>
                        <div
                          className={`${currentMonth ? "" : "text-gray-400"} ${
                            active
                              ? "bg-primary text-white"
                              : "bg-white text-black"
                          } w-full h-full cursor-pointer flex justify-center items-center rounded text-xl`}
                        >
                          {dayNum}
                        </div>
                      </AspectRatio>
                    )}
                  />
                </div>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
