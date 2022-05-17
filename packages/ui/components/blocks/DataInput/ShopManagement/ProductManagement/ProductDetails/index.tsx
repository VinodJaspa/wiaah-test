import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiFolderAdd, HiVideoCamera } from "react-icons/hi";
import { FormOptionType } from "types";
import {
  TranslationText,
  FormikInput,
  Textarea,
  Select,
  MediaUploadModal,
  useFileUploadModal,
  HashTagInput,
  SubCategorySelect,
} from "ui";
import { FileRes } from "../../../../../helpers";

export interface ProductGeneralDetailsProps {}

const MAX_PRODUCTS_IMAGE = 4;

export const ProductGeneralDetails: React.FC<ProductGeneralDetailsProps> =
  () => {
    const { uploadImage, uploadVideo } = useFileUploadModal();
    const [images, setImages] = React.useState<FileRes[]>([]);
    const [videos, setVideos] = React.useState<string[]>([]);
    const { t } = useTranslation();
    return (
      <div className="w-full flex flex-col gap-4">
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({}) => {
            return (
              <Form className="w-full flex flex-col gap-4">
                <span className="text-2xl font-semibold">
                  {t("name_&_description", "Name & Description")}
                </span>
                <FormikInput name="name" placeholder={t("name", "Name")} />
                <FormikInput
                  name="description"
                  as={Textarea}
                  placeholder={t("description", "Description")}
                />
                <FormikInput
                  name="metaTagDescription"
                  className="bg-white"
                  as={Textarea}
                  placeholder={t(
                    "meta_tag_description",
                    "Meta Tag Description"
                  )}
                />
                <FormikInput
                  name="metaTagKeyword"
                  className="bg-white"
                  as={Textarea}
                  placeholder={t("meta_tag_Keyword", "Meta Tag Keyword")}
                />
                <FormikInput
                  name="productTag"
                  className="bg-white"
                  as={Textarea}
                  placeholder={t("product_tag", "Product Tag")}
                />

                <span className="text-2xl font-semibold">
                  {t("price_&_attributes", "Price & Attributes")}
                </span>
                <FormikInput name="price" placeholder={t("price", "Price")} />
                <FormikInput as={Select} name="wiaah">
                  <option value="0">{t("wiaah", "wiaah")}</option>
                  {wiaahOpts.map((opt, i) => (
                    <option key={i} value={opt.value}>
                      <TranslationText translationObject={opt.name} />
                    </option>
                  ))}
                </FormikInput>
                <SubCategorySelect />

                <FormikInput
                  name="quantity"
                  type={"number"}
                  placeholder={t("quantity", "Quantity")}
                />
                <HashTagInput />
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
                      <div className="w-32 h-32">
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

const wiaahOpts: FormOptionType[] = [...Array(5)].map(() => ({
  name: {
    translationKey: "wiaah",
    fallbackText: "Wiaah",
  },
  value: "wiaah",
}));

const categoryiesOpts: FormOptionType[] = [...Array(5)].map(() => ({
  name: {
    fallbackText: "category",
    translationKey: "category",
  },
  value: "category",
}));
