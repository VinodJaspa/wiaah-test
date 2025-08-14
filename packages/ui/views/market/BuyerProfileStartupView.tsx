import React from "react";
import { useTranslation } from "react-i18next";
import { MdArrowBackIosNew } from "react-icons/md";

import {
  AccountVerifciationForm,
  AccountVerificationFormData,
  ArrowLeftAlt1Icon,
  ArrowRightAltIcon,
  Container,
  Divider,
  HStack,
  useRequestAccountVerification,
  useResponsive
} from "@UI";
// @ts-ignore

import { Button } from "@UI";
import { AccountSignup } from "@features/Auth/views";
import { StepperStepType } from "types";
import { runIfFn } from "utils";
import Image from "next/image";


import PrimaryButton from "@UI/components/shadcn-components/Buttons/primaryButton";
import { FormWrapper } from "@UI/components/shadcn-components/FormWrapper/InnerFormWrapper";
import FormSubmitLoader from "@features/Auth/components/Spinner";
import { AccountInforamtion } from "@features/Auth/views/Steps/AuthFormStepThree";
import { AccountSignEmailVerificationStep } from "@features/Auth/views/Steps/AuthFormStepTwo";
import Subtitle from "@UI/components/shadcn-components/Title/Subtitle";
import { accountType } from "nest-utils";
interface StepperProps {
  setFormSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  isFormSubmitting: boolean;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  stepsName: any
}


export const BuyerProfileStartupView: React.FC<StepperProps> = ({ currentStep, setCurrentStep, isFormSubmitting, setFormSubmitting, stepsName }) => {


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
          <>


            <AccountSignup
              onSuccess={requestNextStep}
              accountType={"buyer"}
              ref={(v: { submit: () => any }) => {
                if (v && typeof v.submit === "function") {
                  addSubmitRequest(0, v.submit);
                }
              }}
            />
          </>

        ),
      },
      {
        stepName: t("Email Verification") as string,
        key: 1,
        stepComponent: (
          <>

            <AccountSignEmailVerificationStep
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
      {
        stepName: t("Profile Picture"),
        key: 2,
        stepComponent:
          (

            <>
              {isFormSubmitting && (
                <FormSubmitLoader />
              )}

              <ProfilePictureStep
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




    ],
    []
  );



  const currentStepComp = steps.at(currentStep) || null;




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

        <p className="text-xs text-gray-500">{`Step ${currentStep+1} of ${totalSteps}`}</p>
      </div>
    );
  };


  return isMobile ? (

    <div className="flex flex-col gap-2 w-full h-full p-2">

      <StepperHeaderMobile
        currentStep={currentStep}
        totalSteps={steps.length}
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

      <div className="mt-8 p-1">
        <FormWrapper>
          <div>
            {runIfFn(currentStepComp?.stepComponent)}
          </div>

          {/* Navigation Buttons */}
          <div className="flex p-2 mt-4">
            <Container className="flex w-full justify-between">
              <button
                className="flex items-center rounded-md py-2 pl-0 pr-8"
                disabled={currentStep === 0}
                onClick={requestPrevStep}
              >
                <MdArrowBackIosNew className="mr-1 inline" />
                {t("Back")}
              </button>

              <PrimaryButton onClick={requestNextStep}>
                {t("Next")}
              </PrimaryButton>
            </Container>
          </div>
        </FormWrapper>
      </div>

    </>
  );

};









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





type ProfilePictureStepProps = {
  onSuccess: () => void;
};

export type ProfilePictureStepHandle = {
  submit: () => void;
};

export const ProfilePictureStep = React.forwardRef<ProfilePictureStepHandle, ProfilePictureStepProps>(
  ({ onSuccess }, ref) => {
    const [image, setImage] = React.useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result as string);
        reader.readAsDataURL(file);
      }
    };

    // Expose submit function to parent
    React.useImperativeHandle(ref, () => ({
      submit: () => {
        if (image) {
          onSuccess();
        } else {
          alert("Please upload a profile picture first.");
        }
      },
    }));

    return (
      <div className="flex flex-col items-center justify-center py-8">
        {/* Heading */}
        <Subtitle className="mb-4">Add a profile picture</Subtitle>
        <Divider />

        {/* Image Preview */}
        {image && (
          <div className="w-full max-w-md min-h-[200px] rounded-2xl overflow-hidden shadow bg-white">
            <img
              src={image}
              alt="Profile preview"
              className="w-full h-full object-contain"
            />
          </div>
        )}



        {/* Hidden File Input */}
        <input
          type="file"
          id="profileUpload"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {/* Upload Button */}
        <label
          htmlFor="profileUpload"
          className="inline-block mt-8 px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300 transition"
        >
          {!image ? "Choose Photo" : "Change Photo"}
        </label>

      </div>

    );
  }
);
ProfilePictureStep.displayName = "ProfilePictureStep";