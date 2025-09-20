import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import React, { useState } from "react";
import demoidentity from "./identity.svg";
import StepDots from "./StepDots";

import { PreviewModal, TakePictureModal } from "@blocks";
import IDUploadModal from "@blocks/Modals/IdUploadModal";

import NavigationHeader from "@UI/components/NavigationHeader";
import IDInformationReview from "./IdVerfication";

export default function IdentityVerification() {
  const [step, setStep] = useState(1);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewFile, setPreviewFile] = React.useState<File | null>(null);
  const [formData, setFormData] = useState({
    id_front: null,
    id_back: null,
    VVCPicture: null,
    verificationCode: null,
  });


  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeField, setActiveField] = useState(null);
  const openModalFor = (field) => {
    setActiveField(field);
    setIsModalOpen(true);
  }; const handleCapture = (imgSrc, file, field) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [field]: imgSrc ? file : null,
      }));
    }
  };


  return (
    <main className="flex bg-white mb-32 md:mb-0">
      {/* Sidebar */}
      {/* <aside className="hidden md:flex flex-col w-64 bg-white border-r px-6 py-8 space-y-6">
        <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full text-black font-medium w-fit mb-8">
          <RxIdCard />
          <span>Verify Your Identity</span>
        </div>
      </aside> */}

      {/* Main Content */}
      <div className="flex-1 px-2  pt-5 md:pt-5 sm:md-12">
        <div className="text-center sm:text-left space-y-2 py-4">
          <NavigationHeader title="" onBack={() => setStep(pre => pre - 1)} />

          <StepDots currentStep={step} totalSteps={6} />
        </div>

        <PreviewModal
          isOpen={previewOpen}
          imageFile={previewFile}
          onClose={() => setPreviewOpen(false)}
        />

        {/* Step 1 */}
        {step === 1 && (
          <div className=" py-4">
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
          <div className=" py-4">
            <Subtitle>Upload your ID</Subtitle>

            <p className="text-sm text-gray-600">
              Take a photo of your government-issued ID. Make sure it's clear.
            </p>
            <div className="border-2 border-dashed border-gray-200 p-6 rounded-lg text-center text-sm">
              <p className="font-semibold text-sm">Upload front of ID</p>
              {formData?.id_front && (
                <FilePreview
                  file={formData.id_front}
                  onView={(file) => {
                    setPreviewFile(formData.id_front);
                    setPreviewOpen(true);
                  }}
                />
              )}

              <button className="mt-2 px-4 py-2 bg-gray-100 rounded-full text-xs" onClick={() => openModalFor("id_front")}>Upload</button>
            </div>

            <div className="border-2 border-dashed border-gray-200 p-6 rounded-lg text-center text-sm">
              <p className="font-semibold text-sm">Upload back of ID</p>
              {formData?.id_back && (
                <FilePreview
                  file={formData?.id_back}
                  onView={(file) => {
                    setPreviewFile(formData?.id_back);
                    setPreviewOpen(true);
                  }}
                />
              )}
              <button className="mt-2 px-4 py-2 bg-gray-100 rounded-full text-xs" onClick={() => openModalFor("id_back")}>Upload</button>
            </div>

            <SelfieWithIdUpload onCapture={(imgSrc, file) => handleCapture(imgSrc, file, "VVCPicture")} formData={formData} setPreviewFile={setPreviewFile} setPreviewOpen={setPreviewOpen} />
            <IDUploadModal
              isOpen={isModalOpen}
              formData={formData}
              fieldName={activeField}
              setFormData={setFormData}
              onClose={() => setIsModalOpen(false)}


            />
            <div className="flex justify-between pt-4">
              <button
                onClick={prevStep}
                className="text-black border border-gray-400 px-6 py-2 rounded-full font-medium hover:bg-gray-100"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900"
              >
                Continue
              </button>
            </div>
          </div>
        )}





        {/* Steps 3-6 remain unchanged */}
        {step === 3 && (
          <div className=" text-center py-4">
            <Subtitle>Preview your ID</Subtitle>

            <DocumentPreview formData={formData} prevStep={prevStep} nextStep={nextStep} />
          </div>
        )}

        {step === 4 && (
          <div className="py-2">
            <IDInformationReview  setFormData={setFormData}formData={formData} prevStep={prevStep} nextStep={nextStep} />
          </div>
        )}

        {step === 5 && (
          <div className="text-center py-4">
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
          <div className=" text-center">
            <h2 className="text-2xl font-bold">Identity Verified</h2>
            <p className="text-gray-600">Your identity has been successfully verified. Thank you!</p>
            <button onClick={() => setStep(1)} className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900">Back to Dashboard</button>
          </div>
        )}
      </div>
    </main>
  );
}
function SelfieWithIdUpload({ onCapture, formData, setPreviewOpen, setPreviewFile }) {
  const [isOpen, setOpen] = useState(false);
  // handlers

  return (
    <div className="border-2 border-dashed border-gray-200 p-6 rounded-lg text-center text-sm">
      <p className="font-semibold text-sm">
        Take a selfie while holding your ID next to your face
      </p>
      <button className="mt-2 px-4 py-2 bg-gray-100 rounded-full text-xs" onClick={() => setOpen(true)}>Open Camera</button>
      {formData.VVCPicture && (
        <FilePreview
          file={formData?.VVCPicture}
          onView={(file) => {
            setPreviewFile(file);
            setPreviewOpen(true);
          }}
        />
      )}
      <TakePictureModal onClose={() => setOpen(false)} isOpen={isOpen} onImgCapture={onCapture} />
    </div>
  );
}



interface FilePreviewProps {
  file: File;
  onView: (file: File) => void;
  maxLength?: number;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onView, maxLength = 20 }) => {
  const trimmedName =
    file.name.length > maxLength ? file.name.slice(0, maxLength) + "..." : file.name;

  return (
    <div className="flex items-center gap-2 pt-2 pb-2 text-sm">
      <p className="font-normal truncate max-w-xs" title={file.name}>
        {trimmedName}
      </p>
      <button
        onClick={() => onView(file)}
        className="text-blue-600 underline text-xs hover:text-blue-800"
        type="button"
      >
        View
      </button>
    </div>
  );
};

/* --- DropZone Component --- */
type DropZoneProps = {
  title: string;
  description: string;
  file: File | null;
  setFile: (file: File) => void;
  openImageModal: () => void;
};



const DocumentPreview = ({ prevStep, nextStep, formData }) => {
  const [idFrontURL, setIdFrontURL] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (formData.id_front) {
      const url = URL.createObjectURL(formData.id_front);
      setIdFrontURL(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setIdFrontURL(null);
    }
    return () => {
      if (idFrontURL) {
        URL.revokeObjectURL(idFrontURL);
      }
    }
  }, [formData.id_front]);
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
          src={idFrontURL ?? demoidentity.src}
          alt="ID Preview"
          className="w-full object-cover"
        />
      </div>

      {/* Instruction */}
      <p className="text-gray-600 text-sm">
        Make sure all details are clear and legible. If not, please upload a new image.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 space-x-3 pt-4">
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














