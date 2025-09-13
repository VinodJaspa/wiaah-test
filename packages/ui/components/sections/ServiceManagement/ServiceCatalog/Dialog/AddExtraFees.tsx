import { Dialog, Transition } from '@headlessui/react';
import PrimaryButton from '@UI/components/shadcn-components/Buttons/primaryButton';
import InputField from '@UI/components/shadcn-components/Fields/InputField';
import { Fragment } from 'react';
import { Formik, Form } from 'formik';

interface AddExtraFeesDialogValues {
    name: string;
    price: string;
}

export default function AddExtraFeesDialog({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const initialValues: AddExtraFeesDialogValues = {
        name: '',
        price: '',
    };

    const handleSubmit = (values: AddExtraFeesDialogValues) => {
        console.log('Submitted:', values);
        onClose();
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/20" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="scale-95 opacity-0"
                    enterTo="scale-100 opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="scale-100 opacity-100"
                    leaveTo="scale-95 opacity-0"
                >
                    <Dialog.Panel className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg z-10">
                        <Dialog.Title className="text-md font-bold mb-6">Add Extra Fees</Dialog.Title>

                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                            {({ values, handleChange, handleBlur }) => (
                                <Form className="space-y-4">
                                    <InputField
                                        name="name"
                                        label="Name"
                                        placeholder="Enter the add-ons service name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <InputField
                                        name="price"
                                        label="Type of Extra"
                                        placeholder="Enter  the add-ons service name"
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <InputField
                                        name="price"
                                        label="Price"
                                        placeholder="Enter the price"
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    <div className="flex justify-end pt-4">
                                        <PrimaryButton type="submit">Save</PrimaryButton>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
