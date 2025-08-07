import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import InputField from '@UI/components/shadcn-components/Fields/InputField';
import DateOfBirthSelector from '@UI/components/shadcn-components/DateOfBirthSelector/DateOfBirthSelector';
import { useRecoilState } from 'recoil';
import { accountFormState, formStepState } from '@UI/store/sellerAccountFormState.atom';
import SelectField from '@UI/components/shadcn-components/Fields/SelectField';


export type AuthFormStepOneRef = {
    submit: () => Promise<void>;
    getValues: () => any;
    validate: () => Promise<Record<string, string>>;
};

export const AuthFormStepOne = forwardRef<AuthFormStepOneRef>((_, ref) => {
    const [account, setAccount] = useRecoilState(accountFormState);
    const [, setStep] = useRecoilState(formStepState);

    const initialValues = {
        email: account.email || '',
        password: account.password || '',
        confirmPassword: account.password || '',
        firstName: '',
        lastName: '',
        gender: '',
        birthMonth: '',
        birthDay: '',
        birthYear: '',
        birthDate: '',
        accountType: 'seller',
    };

    const formikRef = useRef<FormikProps<typeof initialValues>>(null);

    useImperativeHandle(ref, () => ({
        submit: async () => {
            if (formikRef.current) {
                await formikRef.current.submitForm();
       

            }
        },
        getValues: () => {
            const values = formikRef.current?.values;
            if (!values) return {};

            const { birthYear, birthMonth, birthDay } = values;
            const birthDate = `${birthYear}-${birthMonth.padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;

            return {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,     
                gender: values.gender.toLowerCase(), 
                confirmPassword: values.confirmPassword,
                birthDate,
                accountType: "seller", 
            };
        },
        validate: async () => {
            if (!formikRef.current) return {};
            const errors = await formikRef.current.validateForm();
            return errors;
        },
    }));

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        gender: Yup.string().oneOf(['MALE', 'FEMALE', 'OTHER'], 'Select a valid gender').required('Gender is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().matches(/^\d{6}$/, 'Password must be exactly 6 digits').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Please confirm your password'),
    });

    return (
        <Formik
            innerRef={formikRef}
            initialValues={initialValues}
           
            validationSchema={validationSchema}
            onSubmit={(values) => {
                const {
                    email,
                    password,
                    firstName,
                    lastName,
                    gender,
                    birthDay,
                    birthMonth,
                    birthYear,
                } = values;

                setAccount((prev) => ({
                    ...prev,
                    email,
                    firstName,
                    lastName,
                    gender: values.gender.toLowerCase() === 'female' ? 'female' : 'male',
                    accountType: 'seller',
                    birthDate: `${birthYear}-${birthMonth.padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`,
                }));

                setStep((prev) => prev + 1);
            }}
        >
            {(formikProps) => (
                <Form className="mt-4 space-y-6">
                    <div className="space-y-4">
                        <div className="w-full md:flex md:gap-4">
                            <div className="w-full md:w-1/2 mb-4 md:mb-0">
                                <InputField
                                    label="First Name"
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <InputField
                                    label="Last Name"
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>

                        <div>
                            <SelectField id="gender"
                                name="gender"
                                defaultValue={"Male"}
                                label='Gender'
                                options={[
                                    { label: "Male", value: "MALE" },
                                    { label: "Female", value: "FEMALE" },
                                    { label: "Other", value: "OTHER" },
                                ]}

                                placeholder="Select Gender" />

                        </div>

                        <InputField
                            label="Email"
                            name="email"
                            type="text"
                            placeholder="Email"
                            className="mb-2"
                        />
                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="mb-2"
                        />
                        <InputField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            className="mb-2"
                        />
                    </div>

                    <div className="mb-4">
                        <DateOfBirthSelector  />
                        
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">
                        By signing up, you agree to our{' '}
                        <a href="#" className="text-blue-600 underline">Terms</a>,{' '}
                        <a href="#" className="text-blue-600 underline">Privacy Policy</a>, and{' '}
                        <a href="#" className="text-blue-600 underline">Cookie Use</a>.
                    </p>
                </Form>
            )}
        </Formik>
    );
});
