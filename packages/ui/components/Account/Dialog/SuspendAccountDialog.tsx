import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Ban, RotateCcw, Database } from "lucide-react";
import ModalTitle from "@UI/components/shadcn-components/Title/DailogTitle";
import { Loader2 } from "lucide-react";

export default function SuspendAccountDialog({ isOpen, onClose, onConfirm, isLoading }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
              <Dialog.Panel className="bg-white w-full max-w-2xl rounded-xl p-8 shadow-xl">
                <ModalTitle>Suspend Account</ModalTitle>

                <h3 className="text-md font-semibold text-black mb-2">
                  What happens when you suspend your account?
                </h3>
                <p className="text-sm text-gray-700 mb-6">
                  Suspending your account will temporarily disable your profile and remove it from public view. You can reactivate it at any time by logging back in.
                </p>

                <div className="space-y-4 mb-6">
                  <FeatureItem
                    icon={<Ban className="w-5 h-5 text-black" />}
                    title="Profile invisibility"
                    subtitle="Profile invisibility"
                  />
                  <FeatureItem
                    icon={<RotateCcw className="w-5 h-5 text-black" />}
                    title="Reactivation"
                    subtitle="Reactivation"
                  />
                  <FeatureItem
                    icon={<Database className="w-5 h-5 text-black" />}
                    title="Data retention"
                    subtitle="Data retention"
                  />
                </div>

                <p className="text-sm text-gray-700 mb-6">
                  Your profile, posts, and activity will not be visible to other users. You can reactivate your account by simply logging back in. Your data (posts, messages, etc.) will be preserved and restored upon reactivation.
                </p>

                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={onConfirm}
                    disabled={isLoading && isLoading}
                    className="bg-black text-white font-semibold px-5 py-2 rounded-md hover:bg-gray-900 flex items-center justify-center min-w-[150px]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Suspending...
                      </>
                    ) : (
                      "Suspend Account"
                    )}
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-gray-100 text-black font-semibold px-5 py-2 rounded-md hover:bg-gray-200"
                    disabled={isLoading && isLoading}
                  >
                    Cancel
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

const FeatureItem = ({ icon, title, subtitle }) => (
  <div className="flex items-center space-x-4">
    <div className="bg-gray-100 p-3 rounded-lg">{icon}</div>
    <div>
      <p className="text-sm font-medium text-black">{title}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  </div>
);
