'use client';

import { Dialog, Transition } from '@headlessui/react';
import ModalTitle from '@UI/components/shadcn-components/Title/DailogTitle';
import { Fragment, useEffect, useState } from 'react';
import { useUpdateAccountMutation } from '@features/Accounts';
import { successToast, errorToast } from 'utils';

const languages = [
  'English (English)',
  'French (Français)',
  'German (Deutsch)',
  'Spanish (Español)',
];


export default function SelectLanguageDialog({
  isOpen,
  onClose,
  account,
}: {
  isOpen: boolean;
  onClose: () => void;
  account: { id: string; lang?: string };
}) {
  const [query, setQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const { mutate: updateAccount, isLoading } = useUpdateAccountMutation();

  useEffect(() => {
    if (account?.lang) {
      setSelectedLanguage(account.lang);
    }
  }, [account?.lang]);

  const filteredLanguages = languages.filter((lang) =>
    lang.toLowerCase().includes(query.toLowerCase())
  );

  const handleContinue = () => {
    if (!selectedLanguage) return;
    updateAccount(
      { id: account.id, lang: selectedLanguage },
      {
        onSuccess: () => {
          successToast('Language updated!');
          onClose();
        },
        onError: () => {
          errorToast('Failed to update language.');
        },
      }
    );
  };

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
            <Dialog.Panel className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-xl relative">
              
              {/* ❌ Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
                onClick={onClose}
              >
                &times;
              </button>

              <ModalTitle>Select Language</ModalTitle>

              <input
                type="text"
                placeholder="Search Language"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 mt-4 mb-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />

              <ul className="space-y-2 text-sm mb-6">
                {filteredLanguages.length > 0 ? (
                  filteredLanguages.map((lang) => (
                    <li
                      key={lang}
                      className={`cursor-pointer px-2 py-1 rounded hover:bg-gray-100 ${
                        selectedLanguage === lang ? 'bg-gray-100 font-semibold' : ''
                      }`}
                      onClick={() => setSelectedLanguage(lang)}
                    >
                      {lang}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 text-center py-4">No results found</li>
                )}
              </ul>

              <button
                onClick={handleContinue}
                className="w-full bg-black text-white rounded-md py-2 font-medium hover:bg-gray-900 disabled:opacity-50"
                disabled={!selectedLanguage || isLoading}
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
