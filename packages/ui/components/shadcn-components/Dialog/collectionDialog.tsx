"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import React from "react";
import { Form, Formik } from "formik";
import InputField from "../Fields/InputField";
import { useCreateSavesCollection } from "@features/Social";
import FormSubmitLoader from "@features/Auth/components/Spinner";

export default function AddToCollectionDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { mutateAsync: createCollection, isLoading } = useCreateSavesCollection();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      {/* Disable outside click close */}
    {isLoading && <FormSubmitLoader/>}
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          /* prevent outside click close */
        }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title as="h3" className="text-xl font-semibold">
                New collection
              </Dialog.Title>
              {/* Manual close button */}
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <Formik
              initialValues={{ name: "" }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await createCollection({ name: values.name });
                  console.log("Collection saved:", values.name);
                  const existing = JSON.parse(localStorage.getItem("collections") || "[]");
                  const updated = [...existing, values.name];
                  localStorage.setItem("collections", JSON.stringify(updated));
                  console.log("Saved in localStorage:", updated);
                //   resetForm();
                  onClose(); // auto-close after save
                } catch (err) {
                  console.error("Error creating collection:", err);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <InputField
                      label="Collection Name"
                      name="name"
                      type="text"
                      placeholder="Enter collection name"
                    />
                  </div>

                  {/* Submit button inside form */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-6 w-full bg-black text-white text-sm font-medium px-4 py-2 rounded-md disabled:opacity-50"
                  >
                    {isLoading ? "Saving..." : "+ Create new collection"}
                  </button>
                </Form>
              )}
            </Formik>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
