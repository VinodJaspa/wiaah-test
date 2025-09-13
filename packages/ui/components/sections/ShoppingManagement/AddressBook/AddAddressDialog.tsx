import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiOutlineMapPin, HiMagnifyingGlass } from "react-icons/hi2";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@UI/components/shadcn-components/Fields/InputField";
import { SearchInput } from "@blocks";
import SearchBoxInner from "@UI/components/shadcn-components/SearchBox/SearchBoxInner";


export default function AddAddressDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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

        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md sm:max-w-xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
              {/* Scrollable content wrapper */}
              <div className="max-h-[90vh] overflow-y-auto p-6">
                <Dialog.Title className="text-lg font-bold text-gray-900 mb-4">
                  Add New Address
                </Dialog.Title>

                {/* Search Box */}
                <SearchBoxInner placeholder="Search Address"/>
                {/* Suggestions */}
                <div className="space-y-2 mb-4">
                  {["123 Main Street", "456 Park Lane", "789 Elm Ave"].map((addr, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                    >
                      <HiOutlineMapPin className="text-lg text-gray-600" />
                      <span>{addr}, Anytown, USA</span>
                    </div>
                  ))}
                </div>

                <AddressForm />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}


const AddressForm = () => {
    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                street: "",
                street2: "",
                zip: "",
                city: "",
                state: "",
                country: "",
                defaultDelivery: false,
                defaultBilling: false,
            }}
            validationSchema={Yup.object({
                firstName: Yup.string().required("Required"),
                lastName: Yup.string().required("Required"),
                street: Yup.string().required("Required"),
                zip: Yup.string().required("Required"),
                city: Yup.string().required("Required"),
                state: Yup.string().required("Required"),
                country: Yup.string().required("Required"),
            })}
            onSubmit={(values) => {
                console.log("Submitted Address:", values);
            }}
        >
            <Form className="space-y-4 text-sm">
                <div className="flex gap-2">
                    <div className="w-1/2">
                        <InputField name="firstName" label="First Name" />
                    </div>
                    <div className="w-1/2">
                        <InputField name="lastName" label="Last Name" />
                    </div>
                </div>

                <InputField name="street" label="Street Address" />
                <InputField name="street2" label="Street Address Line 2 (Optional)" />
                <InputField name="zip" label="Zip Code" />
                <InputField name="city" label="City" />
                <InputField name="state" label="State" />
                <InputField name="country" label="Country" />

                {/* Checkboxes */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="defaultDelivery" />
                  <label htmlFor="defaultDelivery">Set as default delivery address</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="defaultBilling" />
                  <label htmlFor="defaultBilling">Set as default billing address</label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                >
                    Save Address
                </button>
            </Form>
        </Formik>
    );
};


