"use client";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import { DividerWidthText } from "@partials";
import { useSigninMutation } from "api";
import { useSetRecoilState } from "recoil";
import { isUserLoggedIn } from "state";
import { errorToast, successToast } from "utils";
import { t } from "i18next";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleRoute: (route: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
    isOpen,
    onClose,
    handleRoute,
}) => {
    const router = useRouter();
    const setUserLoggedIn = useSetRecoilState(isUserLoggedIn);
    const { mutate: signin, isLoading } = useSigninMutation();

    const initialValues = {
        email: "",
        password: "",
        rememberMe: false,
    };

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().required("Password is required"),
        rememberMe: Yup.boolean(),
    });

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Background overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40" />
                </Transition.Child>

                {/* Modal container */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                {/* Close Button */}
                                <div className="absolute right-4 top-4">
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="flex flex-col items-center justify-center mx-auto min-h-screen p-4">
                                    {/* Logo */}
                                    <div className="mb-6">
                                        <Link href="/" className="flex justify-center">
                                            <img
                                                alt="wiaah_logo"
                                                src="/wiaah_logo.png"
                                                className="h-10 sm:h-14 w-auto object-contain transition duration-300 hover:brightness-110"
                                            />
                                        </Link>
                                    </div>

                                    {/* Card */}
                                    <div className="w-full max-w-md">

                                        <h2 className="text-2xl font-bold text-center mb-6">Welcome back</h2>

                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={loginValidationSchema}
                                            onSubmit={(data) => {
                                                const payload = {
                                                    email: data.email,
                                                    password: data.password,
                                                };
                                                router.push("/inbox");//Todo --need to add logic
                                                onClose();
                                                signin(payload, {
                                                    onSuccess: (res: any) => {

                                                        if (res.success) {
                                                            const token = res.accessToken;
                                                            if (token) {
                                                                setUserLoggedIn(true);
                                                                successToast(res.message || "Sign in successful!");
                                                                router.push("/");
                                                            }
                                                        } else {
                                                            console.log(res, "response");
                                                            const errorMessage =
                                                                res.response?.errors?.[0]?.message || res.message || "Unknown error";
                                                            errorToast(errorMessage);
                                                        }
                                                    },
                                                    onError: (err: any) => {
                                                        const message = err.response?.data?.message || err.message || "Sign in failed. Please try again.";
                                                        errorToast(message);
                                                    },
                                                });
                                            }}
                                        >
                                            {() => (
                                                <Form className="space-y-5">

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Username
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="email"
                                                            placeholder="Enter your email"
                                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:ring-black"
                                                        />
                                                        <ErrorMessage
                                                            name="username"
                                                            component="p"
                                                            className="text-red-500 text-xs mt-1"
                                                        />
                                                    </div>


                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Password
                                                        </label>
                                                        <Field
                                                            type="password"
                                                            name="password"
                                                            placeholder="Enter your password"
                                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:ring-black"
                                                        />
                                                        <ErrorMessage
                                                            name="password"
                                                            component="p"
                                                            className="text-red-500 text-xs mt-1"
                                                        />
                                                    </div>


                                                    <div className="flex items-center justify-between text-sm">
                                                        <label className="flex items-center gap-2 text-gray-600">
                                                            <Field
                                                                type="checkbox"
                                                                name="rememberMe"
                                                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                                            />
                                                            Remember me
                                                        </label>
                                                        <button
                                                            type="button"
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            Forgot password?
                                                        </button>
                                                    </div>




                                                    <button
                                                        type="submit"
                                                        className="w-full bg-black text-white font-medium py-2 rounded-md hover:bg-gray-900 transition"
                                                    >
                                                        Log In
                                                    </button>
                                                    <DividerWidthText text={t("new_to_wiaah?", "new to Wiaah ?")} />
                                                    <div className="align flex w-full flex-col">
                                                        <button
                                                            type="button"
                                                            className="w-full bg-black text-white font-medium py-2 rounded-md hover:bg-gray-900 transition"
                                                            onClick={() => handleRoute("/buyer-signup")}

                                                            id="CreateNewAccountBtn"
                                                        >
                                                            {t("create_your_wiaah_account", "Create your wiaah account now")}
                                                        </button>

                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
