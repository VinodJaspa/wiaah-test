import { useTranslation } from "react-i18next";
import { useFileUploadModal } from "ui/Hooks";
import { FileRes } from "utils";
import React from "react";
import {
  FormikInput,
  Textarea,
  SubCategorySelect,
  HashTagInput,
  ChooseWithInput,
  ToggleVisable,
  ToggleVisableItem,
  Select,
  SelectProps,
  SelectOption,
  TranslationText,
  MediaUploadModal,
} from "ui";
import { Form, Formik } from "formik";
import { HiFolderAdd, HiVideoCamera } from "react-icons/hi";
import { FormOptionType } from "types";
import { ParkingAvailablity } from "dto";
import { NewServiceSchemas } from "validation";

export interface ServiceGeneralDetailsProps {
  onChange?: (data: Record<string, any>) => any;
}

const MAX_PRODUCTS_IMAGE = 4;

export const ServiceGeneralDetails: React.FC<ServiceGeneralDetailsProps> = ({
  onChange,
}) => {
  const { uploadImage, uploadVideo } = useFileUploadModal();
  const [images, setImages] = React.useState<FileRes[]>([]);
  const [videos, setVideos] = React.useState<string[]>([]);
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-4">
      <Formik
        validationSchema={NewServiceSchemas.serviceGeneralDetailsSchema}
        initialValues={{}}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue }) => {
          onChange && onChange(values);
          return (
            <Form className="w-full flex flex-col gap-4">
              <span className="text-2xl font-semibold">
                {t("name_&_description", "Name & Description")}
              </span>
              <FormikInput
                name="name"
                as={Textarea}
                placeholder={t("The name of the serivce")}
              />
              <FormikInput
                name="description"
                as={Textarea}
                placeholder={t(
                  "the_description_of_service",
                  "The Description of the serivce"
                )}
              />
              <FormikInput
                name={"numOfStars"}
                placeholder={t("number_of_stars", "Number of stars")}
              />
              <FormikInput
                name="metaTagDescription"
                className="bg-white"
                as={Textarea}
                placeholder={t("meta_tag_description", "Meta Tag Description")}
              />
              <FormikInput
                name="metaTagKeyword"
                className="bg-white"
                as={Textarea}
                placeholder={t("meta_tag_Keyword", "Meta Tag Keyword")}
              />
              <FormikInput
                name="serviceTag"
                className="bg-white"
                as={Textarea}
                placeholder={t("service_tag", "Service Tag")}
              />

              <span className="text-2xl font-semibold">
                {t("price_&_attributes", "Price & Attributes")}
              </span>
              <FormikInput name="address" placeholder={t("Service Address")} />
              <FormikInput
                name="priceByNight"
                placeholder={t("price_by_night", "Price by night")}
              />

              <SubCategorySelect
                onCateSelection={(e) => setFieldValue("category", e)}
              />

              <FormikInput
                name="quantity"
                type={"number"}
                placeholder={t("quantity", "Quantity")}
              />
              <HashTagInput />
              <ChooseWithInput
                title={t("deposit", "Deposit")}
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
                title={t("cancel_fees", "Cancel fees")}
                name="cancelFees"
                onOptionChange={(opt) => setFieldValue("cancelFees", opt)}
                options={[
                  {
                    title: t("free", "Free"),
                    key: "free",
                    input: null,
                  },
                  {
                    title: t("paid", "Paid"),
                    key: "paid",
                    input: { placeholder: "$" },
                  },
                ]}
              />
              <ToggleVisable>
                {({ changeState, state }) => {
                  return (
                    <div className="flex gap-4 flex-wrap w-full">
                      <FormikInput<SelectProps<ParkingAvailablity>>
                        as={Select}
                        name="parkingAvailability"
                        onOptionSelect={(opt) => {
                          console.log("parking", opt);
                          setFieldValue("parkingAvailability", opt);
                          changeState(opt);
                        }}
                        className="w-96"
                        label={
                          t(
                            "is_parking_available_to_guests",
                            "Is parking available to guests"
                          ) + "?"
                        }
                      >
                        {parkingAvaiableOpts.map(({ name, value }, i) => (
                          <SelectOption key={i} value={value}>
                            <TranslationText translationObject={name} />
                          </SelectOption>
                        ))}
                      </FormikInput>
                      <ToggleVisableItem
                        visableOnState={["yes-free", "yes-paid"]}
                      >
                        <FormikInput<SelectProps<string>>
                          as={Select}
                          name="public"
                          className="w-48"
                          label={t("avaiablity", "Availability")}
                        >
                          <SelectOption value={"private"}>
                            {t("private", "Private")}
                          </SelectOption>
                          <SelectOption value={"public"}>
                            {t("public", "Public")}
                          </SelectOption>
                        </FormikInput>
                      </ToggleVisableItem>
                    </div>
                  );
                }}
              </ToggleVisable>
              <FormikInput<SelectProps>
                label={t("Do guests need to reserve a parking space?")}
                as={Select}
                name="parkingReservation"
              >
                <SelectOption value={"no"}>
                  {t("reservation_needed", "Reservation Needed")}
                </SelectOption>
                <SelectOption value={"yes"}>
                  {t("reservation_not_needed", "Reservation Not Needed")}
                </SelectOption>
              </FormikInput>
              <FormikInput<SelectProps>
                label={t("Is breakfast avaiable to guests?")}
                as={Select}
                onOptionSelect={(opt) =>
                  setFieldValue("breakfastAvailablity", opt)
                }
                name="breakfast"
              >
                <SelectOption value={"no"}>{t("No")}</SelectOption>
                <SelectOption value={"yes-included"}>
                  {t("Yes, it's included in the price")}
                </SelectOption>
                <SelectOption value={"yes-optional"}>
                  {t("Yes, it's optional")}
                </SelectOption>
              </FormikInput>
              <p className="text-2xl font-semibold">{t("file", "File")}</p>
              <div className="flex flex-col gap-4">
                <p className="text-xl font-semibold">
                  {t("upload_video", "Upload Video")}
                </p>
                <div className="grid gap-4 grid-cols-[repeat(5,min(100%,8rem))]">
                  <div
                    onClick={() => {
                      uploadVideo();
                    }}
                    className="cursor-pointer justify-center items-center h-32 w-32 bg-gray-100 border-gray-300 border-[1px] flex"
                  >
                    <HiVideoCamera className="text-4xl text-primary" />
                  </div>
                  {videos.map((vid, i) => (
                    <div key={i} className="w-32 h-32">
                      <video
                        className="w-full h-full object-cover"
                        key={i}
                        //@ts-ignore
                        src={vid}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-xl font-semibold">
                  {t("upload_images", "Upload Images")}
                </p>
                <div className="grid gap-4 grid-cols-[repeat(5,min(100%,8rem))]">
                  {[...Array(MAX_PRODUCTS_IMAGE)].map((_, i) => (
                    <div
                      onClick={() => {
                        uploadImage();
                      }}
                      className="cursor-pointer justify-center items-center h-32 w-32 bg-gray-100 border-gray-300 border-[1px] flex"
                    >
                      {images[i] ? (
                        <>
                          <img
                            className="w-full h-full object-cover"
                            key={i}
                            //@ts-ignore
                            src={images[i]}
                          />
                        </>
                      ) : (
                        <HiFolderAdd className="text-4xl text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <MediaUploadModal
                multiple
                onVidUpload={(res) => {
                  setVideos((state) => [...state, res]);
                }}
                onImgUpload={(res) =>
                  setImages((images) => {
                    if (images.length >= MAX_PRODUCTS_IMAGE) return images;
                    return [...images, res];
                  })
                }
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const parkingAvaiableOpts: FormOptionType<ParkingAvailablity>[] = [
  {
    name: {
      translationKey: "no",
      fallbackText: "No",
    },
    value: "no",
  },
  {
    name: {
      translationKey: "yes_paid",
      fallbackText: "Yes, Paid",
    },
    value: "yes-paid",
  },
  {
    name: {
      translationKey: "yes_free",
      fallbackText: "Yes, free",
    },
    value: "yes-free",
  },
];
