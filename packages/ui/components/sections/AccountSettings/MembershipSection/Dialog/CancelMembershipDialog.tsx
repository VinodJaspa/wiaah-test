import { Dialog, Transition } from '@headlessui/react';
import ModalTitle from '@UI/components/shadcn-components/Title/DailogTitle';
import React, { Fragment } from 'react';

interface CancelMembershipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCancelMembership: () => void;
}

export default function CancelMembershipDialog({
  isOpen,
  onClose,
  onCancelMembership,
}: CancelMembershipDialogProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all space-y-6">
                <ModalTitle>
                Confirm Cancellation
                </ModalTitle>
             

                <div className="border-t pt-4">
                  <p className="font-semibold mb-2">Membership Details</p>
                  <div className="flex justify-between text-sm text-gray-700">
                    <div>
                      <p className="text-gray-500">Plan Name</p>
                      <p>Premium</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Expiration Date</p>
                      <p>12/31/2024</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="font-semibold">Cancellation Summary</p>
                  <p className="text-sm text-gray-600">
                    You are about to cancel your Premium membership. You will lose access to premium features after the expiration date.
                  </p>
                </div>

                <div className="flex flex-col space-y-3 pt-4">
                  <button
                    onClick={onClose}
                    className="bg-gray-100 text-sm font-semibold py-2 rounded-md hover:bg-gray-200"
                  >
                    Keep Membership
                  </button>
                  <button
                    onClick={onCancelMembership}
                    className="bg-red-500 text-sm font-semibold py-2 rounded-md hover:bg-red-300"
                  >
                    Cancel Membership
                  </button>
                </div>

                <p className="text-center text-xs text-gray-500">
                  By canceling, you agree to our{' '}
                  <span className="underline cursor-pointer">terms of service</span> and{' '}
                  <span className="underline cursor-pointer">refund policy</span>.
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

