import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import InputField from "@UI/components/shadcn-components/Fields/InputField";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import TextareaField from "@UI/components/shadcn-components/Fields/TextAreaField";


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
                        <div className="space-y-2">
                            <Subtitle>
                                Video
                            </Subtitle>

                            {video && (
                                <video className="w-full rounded-lg" controls>
                                    <source src={video} />
                                </video>
                            )}
                            <p className="text-sm text-gray-500">Upload a video to showcase your service</p>
                            <input type="file" accept="video/*" onChange={handleVideoUpload} />
                        </div>

                        {/* Photos Upload */}
                        <div className="space-y-2">
                            <Subtitle>
                                Photos
                            </Subtitle>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {photos.map((photo, i) => (
                                    <img
                                        key={i}
                                        src={photo}
                                        alt={`Preview ${i}`}
                                        className="rounded-lg object-cover w-full h-40"
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-gray-500">Upload at least 3 photos to showcase your service</p>
                            <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} />
                        </div>


                    </Form>
                )}
            </Formik>
        </div>
    );
};
