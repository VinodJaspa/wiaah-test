"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";


import { Form, Formik } from "formik";
import VisaLogo from "@UI/components/shadcn-components/logos/VisaLogo";
import MasterCardLogo from "@UI/components/shadcn-components/logos/MasterCardLogo";
import InputField from "@UI/components/shadcn-components/Fields/InputField";





export default function AddPaymentDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <Transition appear show={isOpen}   as={Fragment as React.ElementType}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-black bg-opacity-25" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                        <div className="flex justify-between items-center mb-4">
                            <Dialog.Title as="h3" className="text-xl font-semibold">
                                Add Payment Method
                            </Dialog.Title>
                            <div className="flex gap-2">
                                <VisaLogo/>
                                <MasterCardLogo />
                            </div>
                        </div>

                        <p className="text-sm font-medium mb-4">Add Credit or Debit Card</p>

                        <Formik
                            initialValues={{ cardNumber: '', expiry: '', cvv: '', cardName: '' }}
                            onSubmit={(values) => console.log(values)}
                        >
                            <Form>
                                <div className="space-y-4">
                                    <InputField
                                        label="Card Number"
                                        name="cardNumber"
                                        type="text"
                                        placeholder="Enter card number"
                                    />

                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <InputField
                                                label="Expiry Date"
                                                name="expiry"
                                                type="text"
                                                placeholder="MM/YY"
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <InputField
                                                label="CVV"
                                                name="cvv"
                                                type="text"
                                                placeholder="Enter CVV"
                                            />
                                        </div>
                                    </div>

                                    <InputField
                                        label="Name on Card"
                                        name="cardName"
                                        type="text"
                                        placeholder="Enter name on card"
                                    />
                                </div>
                            </Form>
                        </Formik>
                        <button
                            onClick={onClose}
                            className="mt-6 w-full bg-black text-white text-sm font-medium px-4 py-2 rounded-md"
                        >
                            Add Payment Method
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    );
}
