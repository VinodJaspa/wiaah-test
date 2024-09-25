import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiFolderAdd, HiVideoCamera } from "react-icons/hi";
import {
  FormikInput,
  Textarea,
  MediaUploadModal,
  useFileUploadModal,
  HashTagInput,
  InputProps,
  SubCategorySelect,
  Select,
  SelectOption,
  useFormTranslationWrapper,
  FormikTransalationInput,
  setTranslationStateValue,
  getTranslationStateValue,
  useGetProductCategories,
  FormatCategoryFilters,
  Image,
  useCreateNewProductMutation,
} from "@UI";
import { FileRes } from "utils";
import { ProductCondition, ProductType } from "@features/API";
import * as Yup from "yup";

export interface ProductGeneralDetailsProps {
  onChange?: (values: Record<string, any>) => any;
  values: any;
}

const MAX_PRODUCTS_IMAGE = 4;

export const ProductGeneralDetails: React.FC<ProductGeneralDetailsProps> = ({
  onChange,
  values = {},
}) => {
  const { lang } = useFormTranslationWrapper();
  const { uploadImage, uploadVideo } = useFileUploadModal();
  const [images, setImages] = React.useState<FileRes[]>(values?.images || []);
  const [videos, setVideos] = React.useState<string[]>(values?.videos || []);
  const { data: categories } = useGetProductCategories();

  const { mutate } = useCreateNewProductMutation();

  const { t } = useTranslation();
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .max(100, "Max 100 characters"),
    description: Yup.string().required("Description is required"),
    metaTagDescription: Yup.string().max(150, "Max 150 characters"),
    metaTagKeyword: Yup.string().max(100, "Max 100 characters"),
    productTag: Yup.string().max(50, "Max 50 characters"),
    external_url: Yup.string().url("Must be a valid URL"),
    condition: Yup.mixed().oneOf(
      Object.values(ProductCondition),
      "Invalid condition"
    ),
    type: Yup.mixed().oneOf(Object.values(ProductType), "Invalid product type"),
    price: Yup.number()
      .required("Price is required")
      .min(1, "Price must be at least 1"),
    vat: Yup.number()
      .required("VAT is required")
      .min(0, "VAT must be at least 0"),
    categoryId: Yup.string().required("Category is required"),
    qty: Yup.number()
      .required("Quantity is required")
      .min(1, "Quantity must be at least 1"),
    hashtags: Yup.array().of(
      Yup.string().max(50, "Max 50 characters per hashtag")
    ),
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <Formik
        validationSchema={validationSchema}
        initialValues={values as Record<string, any>}
        onSubmit={(formValues, { setSubmitting }) => {
          // Form submission logic
          console.log("Form is valid and submitted:", formValues);
          setSubmitting(false); // Stop submission process
        }}
      >
        {({ values, setFieldValue }) => {
          onChange && onChange(values);
          return (
            <Form className="w-full flex flex-col gap-4">
              <span className="text-2xl font-semibold">
                {t("title_&_description", "Title & Description")}
              </span>
              <FormikInput
                formikSetField={setFieldValue}
                formikValues={values}
                name="title"
                placeholder={t("Title")}
              />
              <FormikInput
                name="description"
                as={Textarea}
                formikSetField={setFieldValue}
                formikValues={values}
                placeholder={t("Description")}
              />
              <FormikInput
                name="metaTagDescription"
                className="bg-white"
                formikSetField={setFieldValue}
                formikValues={values}
                as={Textarea}
                placeholder={t("Meta Tag Description")}
              />
              <FormikInput
                name="metaTagKeyword"
                className="bg-white"
                formikSetField={setFieldValue}
                formikValues={values}
                as={Textarea}
                placeholder={t("Meta Tag Keyword")}
              />
              <FormikInput
                name="productTag"
                className="bg-white"
                formikSetField={setFieldValue}
                formikValues={values}
                as={Textarea}
                placeholder={t("Product Tag")}
              />

              <span className="text-2xl font-semibold">
                {t("Price & Attributes")}
              </span>

              <FormikInput<InputProps>
                name="external url"
                value={values["external_url"]}
                placeholder={t("Source Site Url")}
              />

              <Select
                value={values["condition"]}
                placeholder={t("Select type of item")}
                onOptionSelect={(v) => setFieldValue("condition", v)}
              >
                {Object.values(ProductCondition).map((v) => (
                  <SelectOption value={v}>{v}</SelectOption>
                ))}
              </Select>

              <Select
                value={values["type"]}
                placeholder={t("Select Prdouct Type")}
                onOptionSelect={(v) => setFieldValue("type", v)}
              >
                {Object.values(ProductType).map((v) => (
                  <SelectOption value={v}>{v}</SelectOption>
                ))}
              </Select>

              <FormikInput<InputProps>
                type={"number"}
                min={1}
                name="price"
                value={values["price"]}
                placeholder={t("Price")}
              />
              <FormikInput<InputProps>
                type={"number"}
                min={1}
                name="vat"
                value={values["vat"]}
                placeholder={t("VAT %")}
              />

              <SubCategorySelect
                onCateSelection={(category) => {
                  if (category[-1]) {
                    setFieldValue("categoryId", category[-1].id);
                  }
                }}
                categories={FormatCategoryFilters(categories || [])}
              />

              <FormikInput
                name="quantity"
                type={"number"}
                value={values["qty"]}
                placeholder={t("Quantity")}
              />
              <HashTagInput
                value={getTranslationStateValue(values, "hashtags", lang)}
                onChange={(e) =>
                  setTranslationStateValue(values, "hashtags", e, lang)
                }
              />
              <p className="text-2xl font-semibold">{t("File")}</p>
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
                          <Image
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
