'use client';

import { Dialog, Transition } from '@headlessui/react';
import ModalTitle from '@UI/components/shadcn-components/Title/DailogTitle';
import { Fragment, useEffect, useState } from 'react';
import { useUpdateAccountMutation } from '@features/Accounts';
import { successToast, errorToast } from 'utils';

const countries = [
  'United States (+1)', 'Canada (+1)', 'United Kingdom (+44)', 'Australia (+61)', 'Germany (+49)', 'France (+33)',
  'Italy (+39)', 'Spain (+34)', 'Japan (+81)', 'China (+86)', 'India (+91)', 'Brazil (+55)', 'Mexico (+52)',
  'South Africa (+27)', 'Nigeria (+234)', 'Egypt (+20)', 'Saudi Arabia (+966)', 'United Arab Emirates (+971)',
  'Argentina (+54)', 'Colombia (+57)', 'Chile (+56)', 'Peru (+51)', 'Venezuela (+58)', 'Kenya (+254)', 'Ghana (+233)',
  'Morocco (+212)', 'Algeria (+213)', 'Tunisia (+216)', 'Ivory Coast (+225)', 'Senegal (+221)', 'Cameroon (+237)',
  'Ethiopia (+251)', 'Tanzania (+255)', 'Uganda (+256)', 'Zimbabwe (+263)', 'Zambia (+260)', 'Mozambique (+258)',
  'Angola (+244)', 'Madagascar (+261)', 'Mauritius (+230)', 'Namibia (+264)',
];

export default function ChooseCountryDialog({
  isOpen,
  onClose,
  account,
}: {
  isOpen: boolean;
  onClose: () => void;
  account: { id: string; country?: string };
}) {
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const { mutate: updateAccount, isLoading } = useUpdateAccountMutation();

  useEffect(() => {
    if (account?.country) {
      setSelectedCountry(account.country);
    }
  }, [account?.country]);

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(query.toLowerCase())
  );

  const handleContinue = () => {
    if (!selectedCountry) return;
    updateAccount(
      { id: account.id, country: selectedCountry },
      {
        onSuccess: () => {
          successToast('Country updated!');
          onClose();
        },
        onError: () => {
          errorToast('Failed to update country.');
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

              <ModalTitle>Choose the country/region</ModalTitle>

              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 mt-4 mb-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />

              <ul className="space-y-2 text-sm mb-6">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <li
                      key={country}
                      className={`cursor-pointer px-2 py-1 rounded hover:bg-gray-100 ${
                        selectedCountry === country ? 'bg-gray-100 font-semibold' : ''
                      }`}
                      onClick={() => setSelectedCountry(country)}
                    >
                      {country}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 text-center py-4">No results found</li>
                )}
              </ul>

              <button
                onClick={handleContinue}
                className="w-full bg-black text-white rounded-md py-2 font-medium hover:bg-gray-900 disabled:opacity-50"
                disabled={!selectedCountry || isLoading}
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
