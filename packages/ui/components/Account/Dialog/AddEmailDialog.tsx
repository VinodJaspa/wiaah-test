import { Dialog, Transition } from '@headlessui/react';
import ModalTitle from '@UI/components/shadcn-components/Title/DailogTitle';
import { Fragment, useState } from 'react';

export default function AddEmailDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [email, setEmail] = useState('');

    const handleContinue = () => {
        console.log('Entered email:', email);
        onClose();
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
                        <Dialog.Panel className="bg-white w-full max-w-md mx-auto rounded-xl p-6 shadow-xl">

                            <ModalTitle>
                                Add Email
                            </ModalTitle>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-100 rounded-lg text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                            />

                            <p className="text-sm text-gray-500 mb-6">
                                You will receive a verification code via email. Your email can be used to connect with others,
                                improve ads, and more, depending on your settings.
                            </p>

                            <button
                                onClick={handleContinue}
                                className="w-full bg-black text-white rounded-md py-2 font-medium hover:bg-gray-900"
                            >
                                Continue
                            </button>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
