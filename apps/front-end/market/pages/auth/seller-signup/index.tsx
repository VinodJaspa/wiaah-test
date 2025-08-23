import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { SellerProfileStartupView, Container, useResponsive } from "ui";
import { useTranslation } from "react-i18next";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import FormSubmitLoader from "@features/Auth/components/Spinner";

const SignUpFinalisation: NextPage = () => {
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [isFormSubmitting, setFormSubmitting] = React.useState(false);
  const { isMobile } = useResponsive();
  const { t } = useTranslation();
  const steps = [
    "Signup",
    "Email Verification",
    "Account Information",
    "Shop information",
    "Verify Your Identity",
    "Select a plan",
    "Listing",
    "Add Payment Method",
    "Shipping Settings",
    "Friends Invitaion",
  ];
  return (
    <>
      <Head>
        <title>Wiaah | Signup Finalisation</title>
      </Head>

      {/* Page Container */}
      <main className="w-full h-screen bg-gray-50">
        {/* Loader Overlay */}
        {isFormSubmitting && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
            <FormSubmitLoader />
          </div>
        )}

        <div className="flex flex-col h-full">
          {/* Stepper Header */}
          {!isMobile && (
            <header className="sticky top-0 z-20 bg-white shadow-md px-6 py-4">
              <div className="flex items-center justify-center">
                {steps.map((label, index) => (
                  <React.Fragment key={index}>
                    {/* Step Circle + Label */}
                    <div className="flex flex-col items-center relative">
                      <div
                        className={`flex items-center justify-center rounded-full h-12 w-12 text-lg font-medium transition duration-300 ease-in-out ${
                          index < currentStep
                            ? "bg-black text-white"
                            : index === currentStep
                            ? "border-2 border-black text-black"
                            : "border-2 border-gray-300 text-gray-400"
                        }`}
                      >
                        {index < currentStep ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>

                      <span className="mt-2 w-24 text-center text-xs font-medium uppercase text-gray-700">
                        {t(label)}
                      </span>
                    </div>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-auto border-t-2 pb-8 transition duration-300 ease-in-out ${
                          index < currentStep - 1
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </header>
          )}

          {/* Scrollable Content */}
          <section className="flex-1 overflow-y-auto px-4 py-6">
            <SellerProfileStartupView
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              isFormSubmitting={isFormSubmitting}
              setFormSubmitting={setFormSubmitting}
              stepsName={steps}
            />
          </section>
        </div>
      </main>
    </>
  );
};

export default SignUpFinalisation;
