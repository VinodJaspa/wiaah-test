'use client';

import { useUpdateAccountMutation } from '@features/Accounts';
import { Dialog, Transition } from '@headlessui/react';
import ModalTitle from '@UI/components/shadcn-components/Title/DailogTitle';
import { Fragment, useState } from 'react';
import { errorToast, successToast } from 'utils';
import React from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 100 }, (_, i) => 2025 - i);

export default function DateOfBirthDialog({
  isOpen,
  account,
  onClose,
}: {
  isOpen: boolean;
  account: { id: string; birthDate?: string };
  onClose: () => void;
}) {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2000);

  const { mutate: updateAccount, isLoading } = useUpdateAccountMutation();

  const handleContinue = () => {
    const dob = new Date(selectedYear, selectedMonth - 1, selectedDay).toISOString();

    updateAccount(
      { id: account.id, birthDate: dob },
      {
        onSuccess: () => {
          successToast('Date of birth updated!');
          onClose();
        },
        onError: () => {
          errorToast('Failed to update date of birth.');
        },
      }
    );
  };
  React.useEffect(() => {
    if (account?.birthDate) {
      const date = new Date(account.birthDate);
      setSelectedDay(date.getDate());
      setSelectedMonth(date.getMonth() + 1); // 0-indexed in JS
      setSelectedYear(date.getFullYear());
    }
  }, [account?.birthDate]);
  

  const renderColumn = (
    items: (string | number)[],
    selected: number | string,
    setSelected: (val: any) => void
  ) => (
    <div className="flex-1 overflow-y-scroll max-h-40 scrollbar-hide snap-y snap-mandatory">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`py-2 text-center text-sm font-medium cursor-pointer snap-start ${
            item === selected ? 'bg-gray-100 font-bold' : 'text-gray-500'
          }`}
          onClick={() => setSelected(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
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

              <ModalTitle>Add Date of Birth</ModalTitle>

              <div className="flex space-x-2 mb-6 text-center mt-4">
                {renderColumn(months, months[selectedMonth - 1], (m) =>
                  setSelectedMonth(months.indexOf(m) + 1)
                )}
                {renderColumn(days, selectedDay, setSelectedDay)}
                {renderColumn(years, selectedYear, setSelectedYear)}
              </div>

              <p className="text-sm text-gray-500 mb-4 text-center">
                Your date of birth helps us personalize your experience and ensure you meet age requirements.
              </p>

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
