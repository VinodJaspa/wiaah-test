import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import InputField from "@UI/components/shadcn-components/Fields/InputField";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import TextareaField from "@UI/components/shadcn-components/Fields/TextAreaField";
import ImageVidoeUploader from "@UI/components/ImageUploader/ImageUploader";

import { shopPresentationSchema } from "./helpers/validationFromik";
import { errorToast, showGraphQLError, successToast } from "utils";
import { useUpdateMyShopMutation } from "@features/Products";
import { UpdateUserShopInput } from "@features/API";
import { uploadFileToCloudinary } from "api";
import { useGetMyAccountQuery } from "@features/Accounts";

export type AuthFormStepFourRef = {
  submit: () => Promise<boolean>;
  setTouched: () => void;
};

const initialValues = {
  name: "",
  description: "",
  images: [] as any[],
  videos: [] as any[],
};

const AuthFormStepFour = forwardRef<AuthFormStepFourRef, { onSuccess?: () => void }>(
  ({ onSuccess }, ref) => {
    const formRef = useRef<FormikProps<typeof initialValues>>(null);
    const { data: account } = useGetMyAccountQuery();
    const { mutateAsync } = useUpdateMyShopMutation();

    useImperativeHandle(ref, () => ({
      submit: async (): Promise<boolean> => {
        if (!formRef.current) return false;

        const errors = await formRef.current.validateForm();
        const isValid = Object.keys(errors).length === 0;

        if (!isValid) {
          formRef.current.setTouched(
            Object.keys(formRef.current.values).reduce((acc, key) => {
              acc[key] = true;
              return acc;
            }, {} as Record<string, boolean>)
          );
          errorToast("Please fix the errors before submitting");
          return false;
        }

        const values = formRef.current.values;

        // Upload images to Cloudinary
        const uploadedImages = await Promise.all(
          values.images.map(async ({ file, type }) => {
            const { secure_url, asset_id } = await uploadFileToCloudinary(file);
            return { type, src: secure_url, asset_id };
          })
        );

        // Upload videos to Cloudinary
        const uploadedVideos = await Promise.all(
          values.videos.map(async ({ file, type }) => {
            const { secure_url, asset_id } = await uploadFileToCloudinary(file);
            return { type, src: secure_url, asset_id };
          })
        );

        // Prepare payload
        const payload: UpdateUserShopInput = {
          ownerId: account?.id || "", // required
          name: values.name ? [{ langId: "en", value: values.name }] : [],
          description: values.description
            ? [{ langId: "en", value: values.description }]
            : [],
          images: uploadedImages,
          videos: uploadedVideos,
        };

        try {
          await mutateAsync(payload);
          successToast("Shop updated successfully!");
          onSuccess?.();
          return true;
        } catch (err: any) {
          console.error("❌ API Error:", err);
          showGraphQLError(err);
          return false;
        }
      },

      setTouched: () => {
        formRef.current?.setTouched(
          Object.keys(formRef.current?.values || {}).reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {} as Record<string, boolean>)
        );
      },
    }));

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Shop Presentation</h2>

        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          validationSchema={shopPresentationSchema}
          onSubmit={() => {}}
        >
          {() => (
            <Form className="space-y-6">
              <InputField label="Service Name" name="name" placeholder="e.g., Home Cleaning" />

              <div className="space-y-1">
                <Subtitle>Service Description</Subtitle>
                <Field name="description">
                  {({ field }: FieldProps) => <TextareaField {...field} placeholder="Service description" />}
                </Field>
              </div>

              <Subtitle>Videos</Subtitle>
              <ImageVidoeUploader name="videos" type="video" maxCount={1} />

              <Subtitle>Photos</Subtitle>
              <ImageVidoeUploader name="images" type="image" maxCount={3} />
            </Form>
          )}
        </Formik>
      </div>
    );
  }
);


export default AuthFormStepFour;
