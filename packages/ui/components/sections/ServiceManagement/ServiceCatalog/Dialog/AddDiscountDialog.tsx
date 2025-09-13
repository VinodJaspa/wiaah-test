import { Dialog, Transition } from '@headlessui/react';
import PrimaryButton from '@UI/components/shadcn-components/Buttons/primaryButton';
import InputField from '@UI/components/shadcn-components/Fields/InputField';
import React, { Fragment } from 'react';
import { Formik, Form } from 'formik';
import TwoMonthRangePicker from '@UI/components/shadcn-components/Fields/TwoMonthsDatePicker';
import { SectionLabel } from '@UI/components/shadcn-components';

interface AddDiscountFormValues {
    name: string;
    price: string;
}

export default function AddDiscountFormDialog({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const initialValues: AddDiscountFormValues = {
        name: '',
        price: '',
    };

    const handleSubmit = (values: AddDiscountFormValues) => {
        console.log('Submitted:', values);
        onClose();
    };
    const [dateRange, setDateRange] = React.useState<[Date | null, Date | null]>([null, null]);

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
                   <Dialog.Panel className="bg-white w-full max-h-[90vh] overflow-y-auto sm:h-auto max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl rounded-none sm:rounded-lg p-4 sm:p-6 shadow-lg z-10">



                        <Dialog.Title className="text-md font-bold mb-6">Add Discounts</Dialog.Title>

                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                            {({ values, handleChange, handleBlur }) => (
                                <Form className="space-y-4">
                                    <InputField
                                        name="name"
                                        label="Name"
                                        placeholder="e.g.,  Summer Sale"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    <InputField
                                        name="price"
                                        label="Price"
                                        placeholder="$0.00"
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <SectionLabel children="Select Dates"/>
                                    <div className="mx-auto justify-items-center w-full pl-4 pr-4 space-y-1">
                                        <TwoMonthRangePicker range={dateRange} onRangeChange={setDateRange} />

                                    </div>
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
