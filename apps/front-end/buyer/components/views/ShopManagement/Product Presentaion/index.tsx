import { shopPresentationSchema } from '@features/Auth/views/Steps/helpers/validationFromik'

import ImageVidoeUploader from '@UI/components/ImageUploader/ImageUploader'
import PrimaryButton from '@UI/components/shadcn-components/Buttons/primaryButton'
import InputField from '@UI/components/shadcn-components/Fields/InputField'
import TextareaField from '@UI/components/shadcn-components/Fields/TextAreaField'
import Subtitle from '@UI/components/shadcn-components/Title/Subtitle'
import { Field, FieldProps, Form, Formik } from 'formik'
import React from 'react'


export default function ShopPresentationForm() {
    const initialValues = {
        name: "",
        description: "",
        images: [] as any[],
        videos: [] as any[],
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Shop Presentation</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={shopPresentationSchema}
                onSubmit={(values) => {
                    console.log("Submitted:", values);
                }}
            >
                {() => (
                    <Form className="space-y-6">
                        <InputField label="Shop Name" name="name" placeholder="e.g., Home Cleaning" />

                        <div className="space-y-1">
                            <Subtitle>Shop Description</Subtitle>
                            <Field name="description">
                                {({ field }: FieldProps) => (
                                    <TextareaField {...field} placeholder="Shop description" />
                                )}
                            </Field>
                        </div>

                        <Subtitle>Videos</Subtitle>
                        <ImageVidoeUploader name="videos" type="video" maxCount={1} />

                        <Subtitle>Photos</Subtitle>
                        <ImageVidoeUploader name="images" type="image" maxCount={3} />

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-end">
                            <PrimaryButton type="submit" className="w-fit px-6 py-3">
                                Save
                            </PrimaryButton>
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    );
}
