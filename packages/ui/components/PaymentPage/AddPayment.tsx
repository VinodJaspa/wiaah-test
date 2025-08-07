"use client";

import { Formik, Form } from "formik";
import VisaLogo from "@UI/components/shadcn-components/logos/VisaLogo";
import MasterCardLogo from "@UI/components/shadcn-components/logos/MasterCardLogo";
import InputField from "@UI/components/shadcn-components/Fields/InputField";

export default function AddPaymentPage() {
    const handleSubmit = (values: any) => {
        console.log("Form submitted:", values);
        // You can add API call logic here
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Add Payment Method</h1>
                <div className="flex gap-2">
                    <VisaLogo />
                    <MasterCardLogo />
                </div>
            </div>

            <p className="text-sm font-medium mb-4">Add Credit or Debit Card</p>

            <Formik
                initialValues={{
                    cardNumber: "",
                    expiry: "",
                    cvv: "",
                    cardName: "",
                }}
                onSubmit={handleSubmit}
            >
                <Form className="space-y-4">
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


                </Form>
            </Formik>
        </>



    );
}
