import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import InputField from "@UI/components/shadcn-components/Fields/InputField";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import TextareaField from "@UI/components/shadcn-components/Fields/TextAreaField";
import ImageVidoeUploader from "@UI/components/ImageUploader/ImageUploader";


interface ServicePresentationSectionProps {
    serviceName?: string;
    serviceDescription?: string;
    initialVideo?: string;
    initialPhotos?: string[];
}

interface FormValues {
    serviceName: string;
    serviceDescription: string;
}

export const ServicePresentationSection: React.FC<ServicePresentationSectionProps> = ({
    serviceName = "",
    serviceDescription = "",
    initialVideo = "",
    initialPhotos = [],
}) => {
    const [video, setVideo] = useState(initialVideo);
    const [photos, setPhotos] = useState<string[]>(initialPhotos);

    const initialValues: FormValues = {
        serviceName,
        serviceDescription,
    };

    const validationSchema = Yup.object().shape({
        serviceName: Yup.string().required("Service name is required"),
        serviceDescription: Yup.string().required("Description is required"),
    });

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setVideo(url);
        }
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const urls = files.map((file) => URL.createObjectURL(file));
        setPhotos((prev) => [...prev, ...urls]);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Shop Presentation</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log("Form submitted:", values);
                }}
            >
                {() => (
                    <Form className="space-y-6">
                        {/* Service Name */}
                        <InputField label="Service Name" name="serviceName" placeholder="e.g., Home Cleaning" />

                        {/* Service Description */}
                        <div className="space-y-1">
                            <Subtitle>
                                Service Description
                            </Subtitle>

                            <Field name="serviceDescription">
                                {({ field, meta }: FieldProps) => (
                                    <>
                                        <TextareaField
                                            {...field}
                                            placeholder="Service description"

                                        />
                                        {meta.touched && meta.error && (
                                            <p className="text-sm text-red-600">{meta.error}</p>
                                        )}
                                    </>
                                )}
                            </Field>
                        </div>

                        {/* Video Upload */}
                        <ImageVidoeUploader
                            name="images"
                            type="image"
                            maxCount={3}
                        />
                         <ImageVidoeUploader
                            name="videos"
                            type="video"
                            maxCount={1}
                        />



                    </Form>
                )}
            </Formik>
        </div>
    );
};
