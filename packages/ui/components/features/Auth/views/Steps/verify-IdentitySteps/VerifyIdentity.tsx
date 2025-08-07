import React, { useState } from "react";
import { RxIdCard } from "react-icons/rx";
import { FiShoppingBag, FiVideo, FiSettings } from "react-icons/fi";
import StepProgressBar from "./stepper";
import StepDots from "./StepDots";
import SectionTitle from "@UI/components/shadcn-components/Title/SectionTitle";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
//@ts-ignore
import demoidentity from "./identity.svg"
import { Form, Formik } from "formik";
import InputField from "@UI/components/shadcn-components/Fields/InputField";
import * as Yup from "yup";
export default function IdentityVerification() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  console.log(demoidentity.src, "demoidentity");

  return (
    <main className="flex bg-white min-h-screen">
      {/* Main Content */}
      <div className="flex-1 px-6 md:px-12 pt-20 md:pt-20">
        <SectionTitle className="mb-4" title="Identity verification" />
        <StepDots  currentStep={step} totalSteps={6} />


        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <Subtitle>
              Verify your identity
            </Subtitle>

            <p className="text-gray-600 mb-6 max-w-xl">
              To help keep our community safe, we'll need to verify your identity.
              This helps us confirm you're a real person and reduces fraud.
            </p>

            <div className="space-y-4 max-w-xl">
              <div className="flex items-start space-x-3">
                <div className="bg-gray-100 p-2 rounded">📇</div>
                <div>
                  <p className="font-medium text-sm">Verify your identity</p>
                  <p className="text-gray-500 text-sm">Confirm your identity with a government-issued ID</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gray-100 p-2 rounded">🛡️</div>
                <div>
                  <p className="font-medium">Your information is safe</p>
                  <p className="text-gray-500 text-sm">We’ll never share your information with anyone</p>
                </div>
              </div>

              <button onClick={nextStep} className="mt-12 bg-black text-white py-2 px-6 rounded-full hover:bg-gray-900">
                Start verification
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <Subtitle>Upload your ID</Subtitle>

            <p className="text-sm text-gray-600">
              Take a photo of your government-issued ID. Make sure it's clear.
            </p>

            <div className="border-2 border-dashed border-gray-200 p-6 rounded-lg text-center text-sm">
              <p className="font-semibold text-sm">Upload front of ID</p>
              <p className="text-gray-600 text-xs">Drag and drop or browse files</p>
              <button className="mt-2 px-4 py-2 bg-gray-100 rounded-full text-xs">Upload</button>
            </div>

            <div className="border-2 border-dashed border-gray-200 p-6 rounded-lg text-center text-sm">
              <p className="font-semibold text-sm">Upload back of ID</p>
              <p className="text-gray-600 text-xs">Drag and drop or browse files</p>
              <button className="mt-2 px-4 py-2 bg-gray-100 rounded-full text-xs">Upload</button>
            </div>

            <div className="border-2 border-dashed border-gray-200 p-6 rounded-lg text-center text-sm">
              <p className="font-semibold text-sm">
                Take a selfie while holding your ID next to your face
              </p>
              <p className="text-gray-600 text-xs">Drag and drop or browse files</p>
              <button className="mt-2 px-4 py-2 bg-gray-100 rounded-full text-xs">Upload</button>
            </div>

            <div className="flex justify-between">
              <button onClick={prevStep} className="text-black border border-gray-400 px-6 py-2 rounded-full font-medium hover:bg-gray-100">Back</button>
              <button onClick={nextStep} className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900">Continue</button>
            </div>
          </div>
        )}

        {/* Steps 3-6 remain unchanged */}
        {step === 3 && (
          <div className="space-y-6 text-center">
            <Subtitle>Preview your ID</Subtitle>

            <DocumentPreview prevStep={prevStep} nextStep={nextStep} />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 max-w-md">
            <IDInformationReview prevStep={prevStep} nextStep={nextStep} />
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Verification Status</h2>
            <p className="text-gray-600">We are currently reviewing your information.</p>
            <ul className="list-disc ml-6 text-sm text-gray-600">
              <li>Document received</li>
              <li>Details under review</li>
              <li>Confirmation pending</li>
            </ul>
            <div className="flex justify-between">
              <button onClick={prevStep} className="text-black border border-gray-400 px-6 py-2 rounded-full font-medium hover:bg-gray-100">Back</button>
              <button onClick={nextStep} className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900">Continue</button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">Identity Verified</h2>
            <p className="text-gray-600">Your identity has been successfully verified. Thank you!</p>
            <button onClick={() => setStep(1)} className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900">Back to Dashboard</button>
          </div>
        )}
      </div>
    </main>
  );
}


const DocumentPreview = ({ prevStep, nextStep }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6 text-center">
      {/* Heading */}
      <div>
        <Subtitle>
          Government-Issued Document
        </Subtitle>

        <p className="text-gray-600 mt-1 text-sm md:text-base">
          (ID card, Passport, driver’s License)
        </p>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm md:text-base">
        Please provide a clear and valid copy of your government-issued identification
        document (such as a passport, driver’s license, or national ID card)
      </p>

      {/* Image */}
      <div className="rounded-xl overflow-hidden shadow-lg w-full bg-gray-50 border border-gray-200">
        <img
          src={demoidentity.src}
          alt="ID Preview"
          className="w-full object-cover"
        />
      </div>

      {/* Instruction */}
      <p className="text-gray-600 text-sm">
        Make sure all details are clear and legible. If not, please upload a new image.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button className="bg-gray-100 hover:bg-gray-200 text-black px-6 py-2 rounded-full font-medium transition" onClick={prevStep}>
          Upload new image
        </button>
        <button onClick={nextStep} className="bg-black hover:bg-gray-900 text-white px-6 py-2 rounded-full font-medium transition">
          Confirm and submit
        </button>
      </div>
    </div>
  );
};




const IDInformationReview = ({ prevStep, nextStep }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    idNumber: "",
    idExpiry: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    dob: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    idNumber: Yup.string(),
    idExpiry: Yup.string().required("Required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Submitted values:", values);
    // Handle form submission logic here
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      {/* Subtitle */}
      <Subtitle>
        ID Information Review
      </Subtitle>

      <p className="text-sm text-gray-500 mb-6">
        Please review the information extracted from the document and make any necessary edits to ensure accuracy.
      </p>

      {/* Formik Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <InputField name="firstName" label="First Name" />
          <InputField name="lastName" label="Last Name" />
          <InputField name="dob" label="Date of Birth" />
          <InputField name="address" label="Address" />
          <InputField name="city" label="City" />
          <InputField name="zip" label="Zip Code" />
          <InputField name="state" label="State" />
          <InputField name="country" label="Country" />
          <InputField name="idNumber" label="ID Number (if applicable)" />
          <InputField name="idExpiry" label="ID Expiration Date" />

          <div className="flex justify-end pt-4">
            <button

              type="submit"
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};


