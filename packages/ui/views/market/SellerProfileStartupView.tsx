import React, { useEffect, useRef } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useTranslation } from "react-i18next";

import {
  ShopInformationStep,
  SelectPackageStep,
  NewShippingSettings,
  FindYourFriendsStep,
  Container,
  BillingAccount,
  NewServiceStepper,
  useGetMyShopType,
  Input,
  EmailArrowDownIcon,
  AccountVerifciationForm,
  PaymentMethodForm,
  useVerifyEmailMutation,
  useResponsive,
  HStack,
  ArrowLeftAlt1Icon,
  ArrowRightAltIcon,
  useGetMyAccountQuery,
  useRequestAccountVerification,
  AccountVerificationFormData,
  useResendRegisterationCodeMutation,
  Stepper,
  StepperContent,
  StepperFormController,
  StepperFormHandler,
  PaymentMethodsSection,
} from "@UI";
// @ts-ignore

import { StepperStepType } from "types";
import { Button } from "@UI";
import { runIfFn, useForm, WiaahLangId } from "utils";
import { useCreateServiceMutation } from "@features/Services/Services/mutation";
import { AccountSignup } from "@features/Auth/views";
import { useSubscribeToMembershipMutation } from "@features/Membership";
import { DoctorSpeakingLanguage, StoreType } from "@features/API";

import 'react-circular-progressbar/dist/styles.css';

import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import { AccountInforamtion } from "@features/Auth/views/Steps/AuthFormStepThree";
import ServicePresentaionForm from "@features/Auth/views/Steps/AuthFromStepFour";
import ChooseMembership from "@UI/components/Membership";
import { FormWrapper } from "@UI/components/shadcn-components/FormWrapper/InnerFormWrapper";
import IdentityVerification from "@features/Auth/views/Steps/verify-IdentitySteps/VerifyIdentity";
import AddPaymentPage from "@UI/components/PaymentPage/AddPayment";
import { AccountSignEmailVerificationStep } from "@features/Auth/views/Steps/AuthFormStepTwo";
import FormSubmitLoader from "@features/Auth/components/Spinner";
interface StepperProps {
  setFormSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  isFormSubmitting: boolean;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  stepsName: any
}


export const SellerProfileStartupView: React.FC<StepperProps> = ({ currentStep, setCurrentStep, isFormSubmitting, setFormSubmitting, stepsName }) => {


  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  const [submitRequests, setSubmitRequests] = React.useState<
    Record<number, () => any>
  >({});
  const handleNextStep = () => setCurrentStep((v) => v + 1);
  const requestSkipStep = () => setCurrentStep((v) => v + 1);
  const addSubmitRequest = (key: string | number, fn: () => any) =>
    setSubmitRequests((v) => ({ ...v, [key]: fn }));



  const requestNextStep = async () => {
    const submitFn = submitRequests[currentStep];
    if (submitFn) {
      setFormSubmitting(true);
      const isSuccess = await submitFn();
      if (isSuccess) {
        setCurrentStep((prev) => prev + 1);
        setFormSubmitting(false);
      }
      else {
        setFormSubmitting(false);
      }
    }
  };




  const requestPrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };


  const steps: StepperStepType[] = React.useMemo(
    () => [
      {
        stepName: t("Signup") as string,
        key: 0,
        stepComponent: (
          <FormWrapper>
            {isFormSubmitting && (
              <FormSubmitLoader />
            )}
            <AccountSignup
              onSuccess={requestNextStep}

              ref={(v: { submit: () => any }) => {
                if (v && typeof v.submit === "function") {
                  addSubmitRequest(0, v.submit);
                }
              }}
            />
          </FormWrapper>
        ),
      },
      {
        stepName: t("Email Verification") as string,
        key: 1,
        stepComponent: (
          <FormWrapper>
            {isFormSubmitting && (
              <FormSubmitLoader />
            )}
            <AccountSignEmailVerificationStep
              onSuccess={handleNextStep}
              ref={(v: { submit: () => any }) => {
                if (v && typeof v.submit === "function") {
                  addSubmitRequest(1, v.submit);
                }
              }}
            />
          </FormWrapper>
        ),
      },
      {
        stepName: t("Shop information"),
        key: 3,
        stepComponent:
          (
           
            <>
              {isFormSubmitting && (
                <FormSubmitLoader />
              )}
              <AccountInforamtion
                onSuccess={handleNextStep}
                ref={(v: { submit: () => any }) => {
                  if (v && typeof v.submit === "function") {
                    addSubmitRequest(1, v.submit);
                  }
                }}
              /> 
            </>
     
          ),
      },
      // {
      //   stepName: t("Service Presentation"),
      //   key: 4,
      //   stepComponent: (
      //     <FormWrapper>
      //       {isFormSubmitting && (
      //         <FormSubmitLoader />
      //       )}
      //       <ServicePresentaionForm />
      //     </FormWrapper>
      //   ),
      // },
      // {
      //   stepName: t("Verify Your Identity"),
      //   key: 4,
      //   stepComponent: (
      //     <FormWrapper>
      //       {isFormSubmitting && (
      //         <FormSubmitLoader />
      //       )}
      //       <IdentityVerification />
      //     </FormWrapper>
      //   ),
      // },
      // {
      //   stepName: t("Select a plan"),
      //   stepComponent: (
      //     <FormWrapper>
      //       {isFormSubmitting && (
      //         <FormSubmitLoader />
      //       )}
      //       <ChooseMembership />
      //     </FormWrapper>
      //   ),
      //   key: 5,
      // },
      // {
      //   stepName: t("Payment Setting "),
      //   stepComponent: (
      //     <FormWrapper>
      //       {isFormSubmitting && (
      //         <FormSubmitLoader />
      //       )}
      //       <AddPaymentPage />
      //     </FormWrapper>
      //   ),
      //   key: 6,
      // },
      // {
      //   key: 7,
      //   stepName: t("Listing"),
      //   stepComponent: (
      //     <>
      //       {isFormSubmitting && (
      //         <FormSubmitLoader />
      //       )}
      //       <SellerListingForm
      //         ref={(v: { submit: () => any }) => {
      //           if (v && typeof v.submit === "function") {
      //             addSubmitRequest(7, v.submit);
      //           }
      //         }}
      //         onSuccess={handleNextStep}
      //       />
      //     </>

      //   ),
      // },
      // {
      //   stepName: t("Shipping Settings"),
      //   stepComponent: (
      //     <>
      //       {isFormSubmitting && (
      //         <FormSubmitLoader />

      //       )}
      //       <NewShippingSettings
      //         ref={(v: { submit: () => any }) => {
      //           if (v && typeof v.submit === "function") {
      //             addSubmitRequest(8, v.submit);
      //           }
      //         }}
      //         onSuccess={handleNextStep}
      //       />
      //     </>

      //   ),
      //   key: 8,
      // },
      // {
      //   stepName: t("Find your friends"),
      //   stepComponent: (
      //     <FormWrapper>
      //       {isFormSubmitting && (
      //         <FormSubmitLoader />

      //       )}
      //       <FindYourFriendsStep
      //         ref={(v: { submit: () => any }) => {
      //           if (v && typeof v.submit === "function") {
      //             addSubmitRequest(9, v.submit);
      //           }
      //         }}
      //         onSuccess={handleNextStep}
      //       />
      //     </FormWrapper>

      //   ),
      //   key: 9,
      // },
    ],
    []
  );


  const currentStepComp = steps.at(currentStep) || null;
  const nextStep = steps.at(currentStep + 1) || null;
  const percentage = ((currentStep + 1) / steps.length) * 100;



  type StepperProps = {
    currentStep: number;
    totalSteps: number;
    stepName: string;
  };

  const StepperHeaderMobile = ({ currentStep, totalSteps, stepName }: StepperProps) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
      <div className="w-full space-y-2 px-4">
        <p className="text-sm font-medium text-black">{stepName}</p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-black h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-gray-500">{`Step ${currentStep} of ${totalSteps}`}</p>
      </div>
    );
  };


  return isMobile ? (
    <div className="flex flex-col gap-2 w-full h-full p-2">

      <StepperHeaderMobile
        currentStep={2}
        totalSteps={10}
        stepName={stepsName[currentStep]}
      />


      <div className="h-full px-4 overflow-y-scroll">
        {/* @ts-ignore */}
        {currentStepComp?.stepComponent as unknown as React.ReactNode}
      </div>

      <HStack className="px-4 justify-between">
        <Button colorScheme="darkbrown" outline>
          <HStack>
            <ArrowLeftAlt1Icon />
            <p>{t("Previous")}</p>
          </HStack>
        </Button>

        <PrimaryButton
          className="m-4 text-sm font-normal bg-black"
          onClick={() => requestNextStep()}

        >
          <HStack>
            <p >{t("Next")}</p>
            <ArrowRightAltIcon />
          </HStack>
        </PrimaryButton>
      </HStack>
    </div>
  ) : (
    <>
      <div>
        <div className="mt-8 p-1">
          <div>
            {runIfFn(currentStepComp?.stepComponent)}
          </div>
          {/* Navigation Buttons */}
          <div className="flex p-2 mt-4">
            <Container className="flex w-full justify-between">
              <button
                className="flex items-center rounded-md py-2 pl-0 pr-8"
                disabled={currentStep === 0}
                onClick={() => {
                  requestPrevStep();
                }}
              >
                <MdArrowBackIosNew className="mr-1 inline" />
                {t("Back")}
              </button>

              <div>
                {/* {currentStep !== 0 &&
                  <button
                    className="rounded-md py-2 px-4"
                    disabled={currentStep === 0 || currentStep == 1}
                    onClick={() => {
                      requestSkipStep();
                    }}
                  >
                    {t("Skip")}
                  </button>
                } */}
                <PrimaryButton
                  onClick={() => {
                    requestNextStep();
                  }}
                >
                  {t("Next")}
                </PrimaryButton>
              </div>
            </Container>

          </div>
        </div>
      </div>
    </>
  );
};





const SellerListingForm = React.forwardRef(
  (
    {
      onSuccess,
    }: {
      onSuccess: () => any;
    },
    ref
  ) => {
    const stepperRef = React.useRef<{
      next: () => any;
      prev: () => any;
    }>(null);
    const { data: shop } = useGetMyShopType();
    const { mutate } = useCreateServiceMutation();

    React.useImperativeHandle(ref, () => {
      return {
        submit: () => {
          mutate(
            {
              cancelable: true,
              description: [
                { langId: "en", value: "English" },
                { langId: "es", value: "Epanish" },
              ],
              hashtags: ["#service", "#awesome"],
              isExternal: false,
              name: [
                { langId: "en", value: "English" },
                { langId: "es", value: "Epanish" },
              ],
              policies: [
                {
                  langId: "en",
                  value: [
                    {
                      policyTitle: "Example Policy",
                      terms: ["Term 1", "Term 2", "Term 3"],
                    },
                  ],
                },
              ],
              price: 99.99,
              speakingLanguages: [DoctorSpeakingLanguage.En],
              thumbnail: {}, // Assuming the input type for Upload
              title: "Amazing Service",
              vat: 10.5,
            },
            { onSuccess }
          );
        },
      };
    });

    return (
      <div className="flex flex-col gap-4 h-full justify-between">
        {/* {shop ? ( */}
        <NewServiceStepper
          ref={stepperRef}
          isEdit={false}
          sellerId={shop?.ownerId || ""}
          lang={WiaahLangId.EN}
        />
        {/* ) : null} */}
      </div>
    );
  }
);



export const SignupAccountVerificationStep = React.forwardRef(
  ({ onSuccess }: { onSuccess: () => any }, ref) => {
    const [data, setData] = React.useState<AccountVerificationFormData>();
    const { mutate } = useRequestAccountVerification();

    React.useImperativeHandle(ref, () => ({
      submit: () => {
        if (data) {
          mutate(data, { onSuccess });
        }
      },
    }));

    return (
      <AccountVerifciationForm
        onChange={(data) => setData(data)}
        value={data}
      />
    );
  }
);

export const SellerSignupPlansStep = React.forwardRef(
  ({ onSuccess }: { onSuccess: () => any }, ref) => {
    const [packageId, setPackageId] = React.useState<string>();

    const { mutate } = useSubscribeToMembershipMutation();
    const { data } = useGetMyShopType();
    React.useImperativeHandle(ref, () => ({
      submit: () => {
        if (!packageId) return;
        mutate(
          { id: packageId },
          {
            onSuccess,
          }
        );
      },
    }));

    return (
      <SelectPackageStep
        value={packageId || ""}
        shopType={data?.storeType || StoreType.Product}
        onChange={(id) => setPackageId(id)}
      ></SelectPackageStep>
    );
  }
);
