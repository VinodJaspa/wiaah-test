import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "@UI/components/shadcn-components/Fields/InputField";
import TextareaField from "@UI/components/shadcn-components/Fields/TextAreaField";
import SelectField from "@UI/components/shadcn-components/Fields/SelectField";

// ✅ Yup validation schema
const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string()
    .max(30, "Username must be 30 characters or less")
    .required("Username is required"),
  bio: Yup.string().max(150, "Bio must be 150 characters or less"),
  gender: Yup.string().required("Gender is required"),
});

export default function EditProfile({ setOpen, open }) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/* Content */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
                {/* Title */}
                <div className="px-6 pt-6">
                  <Dialog.Title className="text-lg font-semibold mb-4">
                    Edit Profile
                  </Dialog.Title>
                </div>

                {/* Scrollable Body */}
                <div className="px-6 pb-6 max-h-[70vh] overflow-y-auto">
                  {/* Profile Photo */}
                <ProfilePhotoUploader/>

                  {/* Formik Form */}
                  <Formik
                    initialValues={{
                      name: "",
                      username: "",
                      bio: "",
                      gender: "",
                    }}
                    validationSchema={ProfileSchema}
                    onSubmit={(values) => {
                      console.log("✅ Submitted values:", values);
                      setOpen(false); // close modal after save
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form className="space-y-4">
                        {/* Name */}
                        <div>
                          <InputField
                            name="name"
                            label="Name"
                            type="text"
                            placeholder="Enter your name"
                          />
                         
                        </div>

                        {/* Username */}
                        <div>
                          <InputField
                            name="username"
                            label="Username"
                            type="text"
                            placeholder="Enter your username"
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            30 characters max
                          </p>
                        </div>

                        {/* Bio */}
                        <div>
                          <TextareaField
                            name="bio"
                            label="Bio"
                            rows={3}
                            placeholder="Enter your bio"
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            150 characters max
                          </p>
                        </div>

                        {/* Gender */}
                        <SelectField
                          id="gender"
                          name="gender"
                          label="Gender"
                          options={[
                            { label: "Male", value: "MALE" },
                            { label: "Female", value: "FEMALE" },
                            { label: "Other", value: "OTHER" },
                          ]}
                          placeholder="Select Gender"
                        />

                        {/* Footer (Sticky) */}
                        <div className="flex justify-end gap-2 pt-4 sticky bottom-0 bg-white">
                          <button
                            type="button"
                            className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100"
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm rounded-md bg-black text-white hover:bg-gray-800"
                          >
                            {isSubmitting ? "Saving..." : "Save"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}


 function ProfilePhotoUploader() {
  const [preview, setPreview] = useState("https://i.pravatar.cc/100");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profile-photo-input")?.click();
  };

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <img
        src={preview}
        alt="Profile"
        className="w-20 h-20 rounded-full object-cover"
      />

      {/* Hidden File Input */}
      <input
        id="profile-photo-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={triggerFileInput}
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        Change profile photo
      </button>

      <div className="text-xs text-gray-400">Remove or reset to default</div>
    </div>
  );
}
