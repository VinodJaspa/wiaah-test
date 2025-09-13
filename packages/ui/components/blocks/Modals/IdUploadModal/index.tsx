import { Dialog, Transition } from "@headlessui/react";
import ModalTitle from "@UI/components/shadcn-components/Title/DailogTitle";
import { IoIosCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import React, { Fragment } from "react";
import Tesseract from 'tesseract.js';
import { errorToast } from "utils";
import FormSubmitLoader from "@features/Auth/components/Spinner";
import { fileURLToPath } from "url";
export default function VerificationModal({
  isOpen,
  onClose,
  fieldName,
  formData,
  setFormData,
}) {



  const imgaeSelcted = Object.keys(formData).find((key) => formData[key]);
  const [selectedKey, setselectedKey] = React.useState(imgaeSelcted)
  const [objectURL, setObjectURL] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [isFileUploaded, setFileUploaded] = React.useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    if (fieldName === "id_front") {
      extractTextFromImage(file, fieldName);
    } else {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
      setFileUploaded(true);
      setselectedKey(fieldName); // set directly here
    }
  };
  


  function extractTextFromImage(file, fieldName) {
    setLoading(true);
    const url = URL.createObjectURL(file);
    Tesseract.recognize(url, 'eng', {
      logger: m => console.log(m),
    })
      .then(({ data: { text } }) => {
        setLoading(false);
        setFileUploaded(true);


        const lowerText = text.toLowerCase();

        let valid = false;
        if (fieldName === "id_front") {
          // Validation for front side of ID
          valid = (
            lowerText.includes('driver license') ||
            lowerText.includes('passport') ||
            lowerText.includes('id number') ||
            lowerText.includes('front')
          );
        }

        if (valid) {
          // Valid ID side, set the file now
          setFormData(prev => ({
            ...prev,
            [fieldName]: file,
          }));
          const selected = formData[fieldName] ? fieldName : Object.keys(formData).find(key => formData[key]);
          setselectedKey(fieldName);

        } else {
          // Invalid ID side: clear and show error
          setFormData(prev => ({
            ...prev,
            [fieldName]: null,
          }));
          errorToast(`Please upload a valid ID image.`);
        }
      })
      .catch(err => {
        setLoading(false);
        URL.revokeObjectURL(url);
        errorToast('Error processing the image. Please try again.');
        setFormData(prev => ({
          ...prev,
          [fieldName]: null,
        }));
      });
  }





  React.useEffect(() => {
    if (selectedKey && formData[selectedKey] instanceof Blob) {
      const url = URL.createObjectURL(formData[selectedKey]);
      setObjectURL(url);

      return () => {
        URL.revokeObjectURL(url);
        setObjectURL(null);
      };
    } else {
      setObjectURL(null);
    }
    return () => { }
  }, [selectedKey, formData, isFileUploaded]);


  return (
    <Transition appear show={isOpen} as={Fragment}>
      {/* Disable closing on outside click by removing onClose from Dialog */}
      <Dialog as="div" className="relative z-50" onClose={() => setselectedKey(null)}>
        {/* Background Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/* Modal Content */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-3xl rounded-lg bg-white p-6 shadow-xl">
                {/* Modal close button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl"
                >
                  <IoClose />
                </button>

                {/* Title */}
                <ModalTitle>Uploaded Image</ModalTitle>

                {/* Centered Image */}
                {/* Loading indicator */}
                {loading && (
                  <FormSubmitLoader />

                )}

                {/* Centered Image */}
                {!loading && selectedKey && (
                  <div className="relative flex items-center justify-center mt-6 border-2 shadow-lg rounded-lg p-4">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          [selectedKey]: null,
                        }))
                      }
                      className="absolute top-2 right-2 text-red-500 hover:text-red-600 text-2xl z-10"
                    >
                      <IoIosCloseCircle />
                    </button>

                    {!loading && objectURL && (
                      <img
                        src={objectURL}
                        alt={selectedKey}

                        className="max-h-[40vh] w-auto max-w-200 object-contain rounded-lg shadow"
                      />
                    )}
                  </div>
                )}

                {/* Drag and Drop Upload Area */}
                <div className="mt-8 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-500">
                  <label className="cursor-pointer block">
                    <p className="fnnt-sm text-sm">Drag and drop images here</p>
                    <p className="text-sm text-gray-500">
                      Or click to select files
                    </p>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/bmp, image/tiff"
                      className="hidden"
                      onChange={handleFileChange}
                    />

                  </label>
                </div>

                {/* Footer Buttons */}
                <div className="mt-8 flex justify-center gap-4">
                  <button
                    className="bg-gray-200 px-6 py-2 rounded-full text-gray-800 hover:bg-gray-300"
                    onClick={() => {
                      setselectedKey(null);
                      setObjectURL(null);
                      onClose();
                    }
                    }

                  >
                    Cancel
                  </button>
                  <button
                    className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900"
                    onClick={() => {
                      if (selectedKey && formData[selectedKey]) {
                        setselectedKey(null);
                        setObjectURL(null);
                        onClose();
                      } else {
                        errorToast("Please upload a valid image");
                      }
                    }
                    }
                    disabled={!selectedKey}
                  >
                    Continue
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
