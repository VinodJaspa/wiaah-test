import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import InputFieldWithDollar from "@UI/components/shadcn-components/Fields/InputFieldWithDollarIcon";
import { Form, Formik } from "formik";

const VoucherCard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Available Amount */}
            <div className="bg-black text-white rounded-xl p-6 shadow-md">
                <p className="text-sm text-gray-300">Available Amount:</p>
                <p className="text-3xl font-bold mt-2">$1,234.56</p>
            </div>

            <div className="flex flex-col gap-4">
                <Formik
                    initialValues={{ amount: '' }}
                    onSubmit={(values) => console.log(values)}
                >
                    {() => (
                        <Form>
                            <InputFieldWithDollar
                                label="Amount"
                                name="amount"
                                type="text"
                                showDollarIcon
                                placeholder="Enter amount"
                            />


                            <PrimaryButton type="submit" className="w-full mt-4 rounded-md">
                                Convert Into Voucher
                            </PrimaryButton>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    );
};

export default VoucherCard;


