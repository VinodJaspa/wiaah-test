'use client';

import { Dialog, Transition } from '@headlessui/react';
import ModalTitle from '@UI/components/shadcn-components/Title/DailogTitle';
import { Fragment, useState } from 'react';

export default function DownloadDataDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<'none' | 'requested' | 'ready'>('none');

  const handleDownloadRequest = () => {
    setStatus('requested');
    setTimeout(() => {
      setStatus('ready');
    }, 3000); // Simulate request time
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/30" />

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
            <Dialog.Panel className="bg-white w-full max-w-xl rounded-xl p-6 shadow-xl">
              <ModalTitle>
              Download Your Data
              </ModalTitle>
            
              <p className="text-gray-700 mb-2">
                You can request a copy of your data, including your profile information, posts, comments, messages, and more. The data will be compiled and made available for download.
              </p>

              <p className="text-gray-700 mb-4">
                Your data will be provided in a ZIP archive, containing JSON or HTML files.
              </p>

              <div className="mb-6 font-medium text-gray-800">
                {status === 'none' && 'No Request Initiated.'}
                {status === 'requested' && 'Preparing your data...'}
                {status === 'ready' && (
                  <a
                    href="/download/mydata.zip"
                    className="text-blue-600 underline"
                    download
                  >
                    Your data is ready. Click here to download.
                  </a>
                )}
              </div>

              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDownloadRequest}
                  className="bg-black text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-900"
                  disabled={status !== 'none'}
                >
                  Request Data Download
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
