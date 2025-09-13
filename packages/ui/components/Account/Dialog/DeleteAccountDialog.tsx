import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export const DeleteAccountDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState({
    profile: false,
    access: false,
    data: false,
  });

  const allChecked = Object.values(checked).every(Boolean);

  const toggle = (key: keyof typeof checked) => {
    setChecked({ ...checked, [key]: !checked[key] });
  };

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Delete Account
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto flex items-center justify-center px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white w-full max-w-2xl rounded-xl p-6 sm:p-8 shadow-xl">
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  Deleting your account is permanent.
                </Dialog.Title>
                <p className="text-sm text-gray-600 mt-2">
                  Once you delete your account, you will not be able to recover your data or
                  reactivate your account. This action is irreversible.
                </p>

                <div className="space-y-3 mt-6">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={checked.profile}
                      onChange={() => toggle("profile")}
                      className="mt-1 accent-red-600"
                    />
                    <span className="text-sm text-gray-800">
                      Profile and posts will be permanently removed.
                    </span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={checked.access}
                      onChange={() => toggle("access")}
                      className="mt-1 accent-red-600"
                    />
                    <span className="text-sm text-gray-800">
                      You will lose access to your account.
                    </span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={checked.data}
                      onChange={() => toggle("data")}
                      className="mt-1 accent-red-600"
                    />
                    <span className="text-sm text-gray-800">
                      Associated data (e.g., messages, followers) will be deleted.
                    </span>
                  </label>
                </div>

                <button className="w-full mt-4 py-2 px-4 bg-gray-100 text-sm font-medium rounded-md">
                  Download My Data
                </button>

                <div className="flex justify-between mt-6">
                  <button
                    className="px-4 py-2 text-sm font-medium rounded-md bg-gray-100"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!allChecked}
                    className={`px-4 py-2 text-sm font-semibold text-white rounded-md ${
                      allChecked
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-red-300 cursor-not-allowed"
                    }`}
                  >
                    Delete Account
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
