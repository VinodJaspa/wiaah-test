import React, { useRef, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import AddDiscountModal from "components/modals/AddDiscountModal";
import TitleDescriptionSection from "components/TitleDescriptionSection";
import ImageVidoeUploader from "components/ImageUploader";

import SectionTitle from "@UI/components/shadcn-components/Title/SectionTitle";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import { useCreateNewProductMutation } from "@UI";
import { CreateProductInput, CashBackInput, ProductType, ProductCondition, VisibilityEnum } from "@features/API";
import FormSubmitLoader from "@features/Auth/components/Spinner";
import ProductAttributes from "components/ ProductAttributes";
import { uploadImageToCloudinary } from "api";
import { productValidationSchema } from "./add-prodect-validation";
interface FilePreview {
  url: string;
  type: "image" | "video";
  id: string;
  file: any
}

// Extend CreateProductInput with images and videos
interface ExtendedProductInput extends CreateProductInput {
  images: FilePreview[];
  videos: FilePreview[];
}
const initialValues: ExtendedProductInput = {
  type: ProductType.Goods,
  title: [{ langId: "en", value: "" }],
  description: [{ langId: "en", value: "" }],
  categoryId: "",
  attributes: [],
  stock: 0,
  discount: { units: 0, amount: 0 },
  cashback: {} as CashBackInput,
  presentations: [], // array of {type: "image" | "video", src: string}
  thumbnail: "",
  price: 0,
  brand: "",
  visibility: VisibilityEnum.Public,
  vat: 0,
  condition: ProductCondition.New,
  sizes: [],
  colors: [],
  images: [],
  videos: [],
};
export default function ProductFormLayout() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { isLoading, mutate: submitNewProduct } = useCreateNewProductMutation();

  const handleSubmit = async (
    values: ExtendedProductInput,
    formikHelpers: FormikHelpers<ExtendedProductInput>
  ) => {
    formikHelpers.setSubmitting(true);
console.log(values,"values");

    try {
      // Upload images to Cloudinary
      const uploadedImages = await Promise.all(
        values.images.map(async ({ file, type }) => {
          const uploadedUrl = await uploadImageToCloudinary(file);
          return { type, src: uploadedUrl };
        })
      );

      // Upload videos to Cloudinary
      const uploadedVideos = await Promise.all(
        values.videos.map(async ({ file, type }) => {
          const uploadedUrl = await uploadImageToCloudinary(file);
          return { type, src: uploadedUrl };
        })
      );

      const presentations = [...uploadedImages, ...uploadedVideos];

      const payload: CreateProductInput = {
        ...values,
        presentations,
      };

      console.log("Submitting payload:", payload);

      // TODO: call your mutation/API with payload

    } catch (err) {
      alert("okknt")
      console.error("Upload or submit failed", err);
      // handle error, show feedback to user
    } finally {
      alert("okk")
      formikHelpers.setSubmitting(false);
    }
  };


  return (
    <Formik initialValues={initialValues} validationSchema={productValidationSchema} onSubmit={handleSubmit}>
      {({ values, setFieldValue, handleSubmit }) => {

        return (
          <>
            {isLoading && <FormSubmitLoader />}
            <AddDiscountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <Form onSubmit={handleSubmit} className="w-full py-4 space-y-6">
              <SectionTitle title="Add a new product" />
              <TitleDescriptionSection />

              <div>
                <Subtitle className="pb-4">Images & Video</Subtitle>

                <ImageVidoeUploader
                  type="image"
                  name="images"
                  maxCount={4}


                />

                {/* Videos uploader */}
                <ImageVidoeUploader
                  type="video"
                  name="videos"
                  maxCount={2}
                />

              </div>

              <ProductAttributes handleOpenModal={() => setIsModalOpen(true)} />

              <div className="text-right">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md bg-black text-white text-sm font-medium"
                >
                  Add Product
                </button>
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}
