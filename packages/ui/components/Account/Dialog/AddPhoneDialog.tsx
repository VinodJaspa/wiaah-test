'use client';

import { Dialog, Transition } from '@headlessui/react';
import ModalTitle from '@UI/components/shadcn-components/Title/DailogTitle';
import { Fragment, useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useUpdateAccountMutation } from '@features/Accounts';
import { successToast, errorToast } from 'utils';

export default function AddPhoneDialog({
  isOpen,
  onClose,
  account,
}: {
  isOpen: boolean;
  onClose: () => void;
  account: { id: string; phone?: string };
}) {
  const [phone, setPhone] = useState(account?.phone || '');

  const { mutate: updateAccount, isLoading } = useUpdateAccountMutation();

  useEffect(() => {
    if (account?.phone) {
      setPhone(account?.phone);
    }
  }, [account?.phone]);

  const handleContinue = () => {
    updateAccount(
      { id: account.id, phone },
      {
        onSuccess: () => {
          successToast('Phone number updated!');
          onClose();
        },
        onError: () => {
          errorToast('Failed to update phone number.');
        },
      }
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

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
            <Dialog.Panel className="bg-white w-full max-w-md mx-auto rounded-xl p-6 shadow-xl relative">
              {/* ❌ Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
                onClick={onClose}
              >
                &times;
              </button>

              <ModalTitle>Add a Phone Number</ModalTitle>

              <div className="mb-4">
                <PhoneInput
                  country={'ch'}
                  value={phone}
                  onChange={setPhone}
                  inputClass="!w-full !px-3 !py-2 !text-sm"
                  inputStyle={{
                    width: '100%',
                    borderRadius: '6px',
                    borderColor: '#e5e7eb',
                    fontSize: '14px',
                  }}
                  containerStyle={{ width: '100%' }}
                />
              </div>

              <div className="text-sm text-gray-600 mb-1">
                You will receive a verification code via SMS.
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Your phone number can be used to connect with others, improve ads, and more, depending on your settings.
              </div>

              <button className="text-xs text-gray-400 underline mb-6 hover:text-gray-600">
                Learn more
              </button>

              <button
                onClick={handleContinue}
                className="w-full bg-black text-white rounded-md py-2 font-medium hover:bg-gray-900"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Continue'}
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
