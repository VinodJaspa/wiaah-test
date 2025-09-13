import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

interface CancellationSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRejoin: () => void;
  onReturnToAccount: () => void;
}

export default function CancellationSuccessDialog({
  isOpen,
  onClose,
  onRejoin,
  onReturnToAccount,
}: CancellationSuccessDialogProps) {
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
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-6">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-200"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all space-y-6">
              <Dialog.Title className="text-xl font-semibold text-center">
                Your Membership Has Been Cancelled
              </Dialog.Title>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between text-sm text-gray-700">
                  <div>
                    <p className="text-gray-500">Plan Name</p>
                    <p className="font-medium">Premium</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Expiration Date</p>
                    <p className="font-medium">12/31/2024</p>
                  </div>
                </div>

                <p className="text-sm text-gray-700">
                  Your Premium membership has been successfully cancelled. You will continue to have access to premium features until the expiration date. No further charges will apply.
                </p>

                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={onRejoin}
                    className="bg-gray-100 hover:bg-gray-200 text-sm font-semibold px-5 py-2 rounded-full"
                  >
                    Rejoin
                  </button>
                  <button
                    onClick={onReturnToAccount}
                    className="bg-black text-white text-sm font-semibold px-5 py-2 rounded-full"
                  >
                    Return to Account
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500 text-center">
                  If you have any questions or need further assistance, please visit our FAQs or contact our support team.
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
