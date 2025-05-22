import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { SellerProfileStartupView, Container, useResponsive } from "ui";
import { useTranslation } from "react-i18next";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SignUpFinalisation: NextPage = () => {
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [isFormSubmitting, setFormSubmitting] = React.useState(false);
  const { isMobile } = useResponsive();
  const { t } = useTranslation();
  const steps = [
    "Signup",
    "Email Verification",
    "Payout",
    "Shop information",
    "Verify Your Identity",
    "Select a plan",
    "Listing",
    "Add Payment Method",
    "Shipping Settings",
    "Find your freinds",
  ];
  return (
    <>
      <Head>
        <title>Wiaah | Signup Finalisation</title>
      </Head>
      <main className="block w-full grow h-screen">
        <Container>
          {isFormSubmitting && (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-primary animate-bounce [animation-delay:0ms]"></div>
                <div className="w-6 h-6 rounded-full bg-primary animate-bounce [animation-delay:150ms]"></div>
                <div className="w-6 h-6 rounded-full bg-primary animate-bounce [animation-delay:300ms]"></div>
              </div>
              <p className="mt-4 text-md text-black animate-pulse">Submitting...</p>
            </div>
          )}

          <div className="sm:p-0 md:p-4 lg:p-8 xl:p-10">
            <div className="sm:p-0 md:p-6 lg:p-8 xl:p-10">
              {!isMobile &&
                <div className="flex items-center mb-24">
                  {steps.map((label, index) => (
                    <React.Fragment key={index}>
                      <div className="flex items-center relative">
                        <div
                          className={`rounded-full h-12 w-12 flex items-center justify-center text-lg font-sm transition duration-500 ease-in-out ${index < currentStep
                            ? "bg-teal-600 text-white"
                            : "border-2 border-teal-600 text-teal-600"
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
                        <div className="absolute top-0 -ml-10  pr-4 text-center mt-16 w-32 text-xs font-medium uppercase text-black whitespace-normal break-words">
                          {t(label)}
                        </div>
                      </div>

                      {/* Line between steps */}
                      {index < steps.length - 1 && (
                        <div
                          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${index < currentStep - 1 ? "border-teal-600" : "border-gray-300"
                            }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              }
              <SellerProfileStartupView currentStep={currentStep} setCurrentStep={setCurrentStep} isFormSubmitting={isFormSubmitting} setFormSubmitting={setFormSubmitting} />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default SignUpFinalisation;
