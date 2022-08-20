import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiFolderAdd, HiVideoCamera } from "react-icons/hi";
import { useReactPubsub } from "react-pubsub";
import {
  useFileUploadModal,
  FormikInput,
  Textarea,
  Select,
  SelectProps,
  SelectOption,
  HashTagInput,
  ChooseWithInput,
  MediaUploadModal,
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
              <FormikInput<SelectProps>
                placeholder={t("Choose establishment type")}
                as={Select}
                name="establishment_type"
              >
                <SelectOption value={"restaurant"}>
                  {t("Restaurant")}
                </SelectOption>
                <SelectOption value={"quick_bites"}>
                  {t("Quick Bites")}
                </SelectOption>
                <SelectOption value={"dessert"}>{t("Dessert")}</SelectOption>
                <SelectOption value={"coffe_&_tea"}>
                  {t("Coffe & tea")}
                </SelectOption>
                <SelectOption value={"bakeries"}>{t("Bakeries")}</SelectOption>
                <SelectOption value={"bars_&_pubs"}>
                  {t("Bars & Pubs")}
                </SelectOption>
                <SelectOption value={"dine_with_a_local_chef"}>
                  {t("Dine With a Local Chef")}
                </SelectOption>
                <SelectOption value={"speciality_food_makret"}>
                  {t("Speciality Food Market")}
                </SelectOption>
                <SelectOption value={"delivery_only"}>
                  {t("Delivery Only")}
                </SelectOption>
              </FormikInput>

              <FormikInput<SelectProps>
                placeholder={t("Choose Cuisines type")}
                as={Select}
                name="cuisines_type"
              >
                <SelectOption value={"asian"}>{t("Asian")}</SelectOption>
                <SelectOption value={"french"}>{t("French")}</SelectOption>
                <SelectOption value={"italian"}>{t("Italian")}</SelectOption>
                <SelectOption value={"indian"}>{t("Indian")}</SelectOption>
                <SelectOption value={"traditional"}>
                  {t("Traditional")}
                </SelectOption>
                <SelectOption value={"egyption"}>{t("Egyption")}</SelectOption>
              </FormikInput>

              <FormikInput<SelectProps>
                placeholder={t("Choose Michelin Guide")}
                as={Select}
                name="Michelin Guide"
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

              <p className="text-2xl font-semibold">{t("file", "File")}</p>
              <div className="flex flex-col gap-4">
                <p className="text-xl font-semibold">{t("Upload Video")}</p>
                <div className="grid gap-4 grid-cols-[repeat(5,min(100%,8rem))]">
                  <div
                    onClick={() => {
                      emit({ uploadType: "vid" });
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
                        emit({ uploadType: "img" });
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
