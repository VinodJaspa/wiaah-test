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
      <main className="block w-full grow h-screen">
{isFormSubmitting && <FormSubmitLoader/>}
      

        <div className="sm:p-0 md:p-4 lg:p-8 xl:p-10">
          <div className="sm:p-0 md:p-6 lg:p-8 xl:p-10">
            {!isMobile &&
              <div className="flex items-center mb-24">
                {steps.map((label, index) => (
                  <React.Fragment key={index}>
                    <div className="flex items-center relative">

                      <div className="absolute top-0 -ml-10  pr-4 text-center mt-16 w-32 text-xs font-medium uppercase text-black whitespace-normal break-words">
                        {t(label)}
                      </div>
                      <div
                        className={`rounded-full h-12 w-12 flex items-center justify-center text-lg font-sm transition duration-500 ease-in-out ${index < currentStep
                          ? "bg-black text-white"
                          : index === currentStep
                            ? "border-2 border-black text-black"
                            : "border-2 border-gray-400 text-gray-400"
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
                    </div>

                    {/* Line between steps */}
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-auto border-t-2 transition duration-500 ease-in-out ${index < currentStep - 1 ? "border-black" : "border-gray-300"
                          }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            }
            <SellerProfileStartupView currentStep={currentStep} setCurrentStep={setCurrentStep} isFormSubmitting={isFormSubmitting} setFormSubmitting={setFormSubmitting} stepsName={steps} />
          </div>
        </div>

      </main>
    </>
  );
};

export default SignUpFinalisation;
