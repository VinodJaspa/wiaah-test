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
import { uploadFileToCloudinary } from "api";
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

  const createProductMutation = useCreateNewProductMutation();

  const handleSubmit = async (
    values: ExtendedProductInput,
    formikHelpers: FormikHelpers<ExtendedProductInput>
  ) => {
    formikHelpers.setSubmitting(true);


    try {


    // Upload images to Cloudinary
    const uploadedImages = await Promise.all(
      values.images.map(async ({ file, type }) => {
        const { secure_url, asset_id } = await uploadFileToCloudinary(file);
        return { type, src: secure_url, id: asset_id };
      })
    );

    // Upload videos to Cloudinary
    const uploadedVideos = await Promise.all(
      values.videos.map(async ({ file, type }) => {
        const { secure_url, asset_id } = await uploadFileToCloudinary(file);
        return { type, src: secure_url, id: asset_id };
      })
    );
    const presentations = [...uploadedImages, ...uploadedVideos];

    const payload: CreateProductInput = {
      attributes: values?.attributes,
      brand: values?.brand,
      cashback: values?.cashback,
      categoryId: values?.categoryId,
      colors: values?.colors,
      condition: values.condition,
      description: values?.description,
      discount: values?.discount,
      external_link: values?.external_link,
      presentations,
      price: values?.price,
      sizes: values?.sizes,
      stock: values?.stock,
      thumbnail: values?.thumbnail,
      title: values?.title,
      type: values?.type,
      vat: values?.vat,
      visibility: values?.visibility,
    };
      

  

      console.log("Submitting payload:", payload);
      const result = await createProductMutation.mutateAsync(payload);

      if (result) {

      } else {

      }



    } catch (err) {

    } finally {

      formikHelpers.setSubmitting(false);
    }
  };


  return (
    <Formik initialValues={initialValues} validationSchema={productValidationSchema} onSubmit={handleSubmit}>
      {({ values, setFieldValue, handleSubmit , isSubmitting }) => {

        return (
          <>
            {( isSubmitting) && <FormSubmitLoader />}

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
