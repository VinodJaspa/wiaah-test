import { useTranslation } from "react-i18next";
import { useFileUploadModal } from "ui/Hooks";
import { FileRes } from "utils";
import React from "react";
import {
  FormikInput,
  Textarea,
  HashTagInput,
  ChooseWithInput,
  Select,
  SelectProps,
  SelectOption,
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

              <span className="text-2xl font-semibold">
                {t("Price & Attributes")}
              </span>
              {/* <FormikInput name="address" placeholder={t("Service Address")} /> */}
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

              <HashTagInput />
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

              <p className="text-2xl font-semibold">{t("file", "File")}</p>
              <div className="flex flex-col gap-4">
                <p className="text-xl font-semibold">{t("Upload Video")}</p>
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
                <p className="text-xl font-semibold">{t("Upload Images")}</p>
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
