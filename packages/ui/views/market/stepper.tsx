import React from "react";
import { useTranslation } from "react-i18next";

const StepperForm = ({ steps = [], currentStep = 0 }) => {
    const { t } = useTranslation();

    return (
        <div className="p-5">
            <div className="mx-4 p-4">
                <div className="flex items-center">
                    {/* Step 1: Personal */}
                    <div className="flex items-center text-teal-600 relative">
                        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                            </svg>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                            {t("Signup")}
                        </div>
                    </div>

                    {/* Step Progress Line */}
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600" />
                    {/* Step 1: Personal */}
                    <div className="flex items-center text-teal-600 relative">
                        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                            </svg>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                            {t("Email Verification")}
                        </div>
                    </div>

                    {/* Step Progress Line */}
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600" />
                    {/* Step 1: Personal */}
                    <div className="flex items-center text-teal-600 relative">
                        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                            </svg>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                            {t("Payout")}
                        </div>
                    </div>

                    {/* Step Progress Line */}
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600" />
                    {/* Step 1: Personal */}
                    <div className="flex items-center text-teal-600 relative">
                        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                            </svg>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                            {t("Shop information")}
                        </div>
                    </div>

                    {/* Step Progress Line */}
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600" />
                    {/* Step 1: Personal */}
                    <div className="flex items-center text-teal-600 relative">
                        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                            </svg>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                            {t("Verify Your Identity")}
                        </div>
                    </div>

                    {/* Step Progress Line */}
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600" />
                    {/* Step 1: Personal */}
                    <div className="flex items-center text-teal-600 relative">
                        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                            </svg>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                            {t("Select a plan")}
                        </div>
                    </div>

                    {/* Step Progress Line */}
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600" />
                    {/* Step 1: Personal */}
                    <div className="flex items-center text-teal-600 relative">
                        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                            </svg>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                            {t("Listing")}
                        </div>
                    </div>

                    {/* Step Progress Line */}
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600" />
                    {/* Step 1: Personal */}
                    <div className="flex items-center text-teal-600 relative">
                        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                            </svg>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                            {t("Add Payment Method")}
                        </div>
                    </div>

                    {/* Step Progress Line */}
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600" />
                    {/* Step 1: Personal */}
                    <div className="flex items-center text-teal-600 relative">
                        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                            </svg>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                            {t("Shipping Settings")}
                        </div>
                    </div>

                    {/* Step Progress Line */}
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600" />

                    {/* Step Progress Line */}
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600" />
                    {/* Step 1: Personal */}
                    <div className="flex items-center text-teal-600 relative">
                        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                            </svg>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                            {t("Find your freinds")}
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default StepperForm;
