import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface PreviewModalProps {
  isOpen: boolean;
  imageFile: File | Blob | null;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  imageFile,
  onClose,
}) => {
  const [imageURL, setImageURL] = useState<string | null>(null);
console.log(imageFile, "imageFile in preview modal");

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageURL(url);
      console.log("url created in preview modal", url);
      
      return () => URL.revokeObjectURL(url);
    } else {
      setImageURL(null);
    }
    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
      }
    }
  }, [imageFile]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        {/* Modal Content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative max-w-lg w-full rounded-lg bg-white p-4 shadow-lg">
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                onClick={onClose}
                aria-label="Close preview modal"
              >
                <IoClose size={24} />
              </button>

              {/* Image Preview */}
              {imageURL ? (
                <img
                  src={imageURL}
                  alt="Uploaded Preview"
                  className="max-h-[80vh] w-auto mx-auto rounded"
                />
              ) : (
                <p className="text-center text-gray-500">No image to preview</p>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
