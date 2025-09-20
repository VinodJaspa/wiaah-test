import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import AutoFillFromOCR from "./AutoFillValues";
import { useRequestAccountVerification } from "@UI";
import { errorToast, successToast } from "utils";

async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default1");

  const cloudName = "dvhitbmqt"; // Your Cloudinary cloud name
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const data = await response.json();
  return data.secure_url;
}



type Payload = {
  firstName: string;
  lastName: string;
  fullAddress: string;
  VVCPicture?: string | null;
  dateOfBirth: string;
  id_front: string;
  id_back: string;
  addressProofBill: string | null;
  VVC: string;
};

function makePayload(data: any): Omit<Payload, 'VVCPicture' | 'VVC'> {
    const fullAddress = `${data.address}, ${data.city}, ${data.state}, ${data.zip}, ${data.country}`;
  
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      fullAddress,
      dateOfBirth:
        typeof data.dateOfBirth === "string"
          ? data.dateOfBirth
          : data.dateOfBirth.toISOString(),
      id_front: data.id_front,
      id_back: data.id_back,
      addressProofBill: data.addressProofBill || "", 
    };
  }
  

const IDInformationReview = ({ prevStep, nextStep, formData, setFormData }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    idNumber: "",
    idExpiry: "",
    VVCPicture: "",
    id_front: "",
    id_back: "",
    addressProofBill: "",
    VVC: "",
  };

  const { mutate: request, isLoading } = useRequestAccountVerification();
  const [uploadingFiles, setUploadingFiles] = useState({
    VVCPicture: false,
    id_front: false,
    id_back: false,
    addressProofBill: false,
  });

  const handleSubmit = async (values) => {
   
    try {
      // Upload each file if it exists and is a File (not a URL string)
      const uploadedVVCPicture = formData.VVCPicture instanceof File
        ? await uploadImageToCloudinary(formData.VVCPicture)
        : formData.VVCPicture;
  
      const uploadedIdFront = formData.id_front instanceof File
        ? await uploadImageToCloudinary(formData.id_front)
        : formData.id_front;
  
      const uploadedIdBack = formData.id_back instanceof File
        ? await uploadImageToCloudinary(formData.id_back)
        : formData.id_back;
  
      const uploadedAddressProofBill = formData.addressProofBill instanceof File
        ? await uploadImageToCloudinary(formData.addressProofBill)
        : formData.addressProofBill;
  
      // Now build payload with uploaded URLs
      const payload = makePayload({
        ...values,
        VVCPicture: uploadedVVCPicture,
        id_front: uploadedIdFront,
        id_back: uploadedIdBack,
        addressProofBill: uploadedAddressProofBill,
        VVC: values.VVC || formData.VVC || "",
      });
  
      // Update formData with URLs instead of files
      setFormData(prev => ({
        ...prev,
        VVCPicture: uploadedVVCPicture,
        id_front: uploadedIdFront,
        id_back: uploadedIdBack,
        addressProofBill: uploadedAddressProofBill,
        ...values,
      }));
  console.log(payload ,"load");
  
      request(payload, {
        onSuccess: () => {
          successToast("Verification request submitted successfully!");
          nextStep();
        },
        onError: (error) => {
          errorToast("Failed to submit verification request.");
          console.error("Verification request error:", error);
        },
      });
    } catch (err) {
      errorToast("File upload failed, please try again.");
      console.error("File upload error:", err);
    }
  };
  

  return (
    <div className="px-2">
      <Subtitle>ID Information Review</Subtitle>

      <p className="text-sm text-gray-500 mb-6">
        Please review the information extracted from the document and make any necessary edits to ensure accuracy.
      </p>

      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">

            <AutoFillFromOCR
              prevStep={prevStep}
              nextStep={nextStep}
              formData={formData}
              initialValues={initialValues}
            />

            {/* File uploads */}
           

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="text-black border border-gray-400 px-6 py-2 rounded-full font-medium hover:bg-gray-100"
                disabled={isSubmitting || isLoading}
              >
                Back
              </button>

              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default IDInformationReview;
