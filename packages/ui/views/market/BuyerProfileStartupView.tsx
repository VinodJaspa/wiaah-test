import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useTranslation } from "react-i18next";
import {
  MultiStepFrom,
  PersonalInformationStep,
  FindYourFriendsStep,
  Container,
  Button,
  AccountSignEmailVerificationStep,
  useResponsive,
} from "@UI";
import { StepperStepType } from "types";
import {
  ArrowLeftAlt1Icon,
  ArrowRightAltIcon,
  HStack,
  MultiStepFromHandle,
  PaymentMethodForm,
} from "../../components";
import { AccountSignup } from "@features/Auth/views";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; 
import { runIfFn } from "@UI/../utils/src";

export const BuyerProfileStartUpView: React.FC = ({}) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const [currentStep, setCurrentStep] = React.useState<number>(0);

  const [submitRequests, setSubmitRequests] = React.useState<
    Record<number, () => any>
  >({});

  const handleNextStep = () => setCurrentStep((v) => v + 1);

  const requestSkipStep = () => setCurrentStep((v) => v + 1);

  const addSubmitRequest = (key: string | number, fn: () => any) =>
    setSubmitRequests((v) => ({ ...v, [key]: fn }));

  const requestNextStep = () => {
    const submitFn = submitRequests[currentStep];

    if (typeof submitFn === "function") {
      submitFn();
    }
  };

  const requestPrevStep = () => {};

  const steps: StepperStepType[] = React.useMemo(
    () => [
      {
        stepName: t("Signup"),
        stepComponent: (
          <AccountSignup
            onSuccess={handleNextStep}
            ref={(v: { submit: () => any }) => {
              if (v && typeof v.submit === "function") {
                addSubmitRequest(0, v.submit);
              }
            }}
          />
        ),
        key: "3",
      },
      {
        stepName: t("Email Verification"),
        key: 1,
        stepComponent: (
          <AccountSignEmailVerificationStep
            onSuccess={handleNextStep}
            ref={(v: { submit: () => any }) => {
              if (v && typeof v.submit === "function") {
                addSubmitRequest(1, v.submit);
              }
            }}
          />
        ),
      },
      {
        stepName: t("Personal information"),
        stepComponent: PersonalInformationStep,
        key: "1",
      },
      {
        stepName: t("Add Payment Method"),
        stepComponent: (
          <PaymentMethodForm
            ref={(v: { submit: () => any }) => {
              if (v && typeof v.submit === "function") {
                addSubmitRequest(2, v.submit);
              }
            }}
            onSuccess={handleNextStep}
          />
        ),
        key: 7,
      },
      {
        stepName: t("Find your freinds"),

        stepComponent: (
          <FindYourFriendsStep
            ref={(v: { submit: () => any }) => {
              if (v && typeof v.submit === "function") {
                addSubmitRequest(3, v.submit);
              }
            }}
            onSuccess={handleNextStep}
          />
        ),
        key: "2",
      },
    ],
    []
  );

  const currentStepComp = steps.at(currentStep) || null;
  const nextStep = steps.at(currentStep + 1) || null;
  const percentage = ((currentStep + 1) / steps.length) * 100;
  return isMobile ? (
    <div className="flex flex-col gap-2 w-full h-full p-2">
      <HStack className="p-2">
        <div className="relative flex justify-center items-center">
          <svg
            className="absolute text-darkerGray text-5xl"
            width="1em"
            height="1em"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="48.5"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>

          <svg
            className="absolute -rotate-90 text-primary text-5xl"
            width="1em"
            strokeDasharray={300 + ((currentStep + 1) / steps.length) * 300}
            strokeDashoffset={300}
            height="1em"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="48.5"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>
          <div className="bg-primary rounded-full w-10 h-10 text-2xl flex justify-center items-center">
            {currentStep + 1}
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">
            {currentStepComp?.stepName.toString()}
          </p>
          <p className="text-xs text-primary">
            {t("Next").toString()} : {nextStep?.stepName.toString()}
          </p>
        </div>
      </HStack>

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

        <Button
          className="m-4 text-sm font-normal"
          onClick={() => requestNextStep()}
          colorScheme="darkbrown"
        >
          <HStack>
            <p>{t("Next")}</p>
            <ArrowRightAltIcon />
          </HStack>
        </Button>
      </HStack>
    </div>
  ) : (
    <>
      <div className="py-28 lg:py-20 h-full">
        <div className="fixed top-0 left-0 z-10 w-full">
          <Container className="">
            <div className="flex items-center justify-between bg-white p-4 lg:hidden">
            <CircularProgressbar
          value={percentage}
          text={`${currentStep + 1} of ${steps.length}`}
          styles={buildStyles({
            pathColor: "#4CAF50", 
            textColor: "#000",
            trailColor: "#e5e7eb", 
            textSize: "16px", 
           
          })}
        />
              <div className="flex flex-col items-end">
                <div className="mb-2 text-lg font-bold">
                  {steps[currentStep].stepName.toString()}
                </div>
                <div className="text-xs text-gray-400">
                  {steps[currentStep + 1]
                    ? t("Next") + ": " + steps[currentStep + 1].stepName
                    : t("Finalisation")}
                </div>
              </div>
            </div>
            <div className="hidden items-stretch justify-start bg-gray-200 lg:flex">
              {steps.map((item, key) => {
                return (
                  <div
                    key={key}
                    className={`${
                      currentStep == key ? "bg-primary text-white" : ""
                    } flex w-4/12 flex-col justify-center px-6 py-4`}
                  >
                    <div className="text-lg font-bold">
                      {t("Step")} {key + 1}
                    </div>
                    <div>{item.stepName.toString()}</div>
                  </div>
                );
              })}
            </div>
          </Container>
        </div>
        <div className="overflow-scroll thinScroll h-full p-4 py-4 md:pl-8 md:py-8">
          {runIfFn(currentStepComp?.stepComponent)}
        </div>

        <div className="fixed bottom-0 left-0 z-10 flex w-full justify-between bg-white p-4 pt-10 lg:px-8">
          <Container className="flex w-full justify-between">
            <button
              className="flex items-center rounded-md py-2 pl-0 pr-8"
              onClick={() => {
                requestPrevStep();
              }}
            >
              <MdArrowBackIosNew className="mr-1 inline" />
              {t("Back")}
            </button>
            <div>
              <button
                className="rounded-md py-2 px-4"
                onClick={() => {
                  requestSkipStep();
                }}
              >
                {t("Skip")}
              </button>
              <Button
                onClick={() => {
                  requestNextStep();
                }}
              >
                {t("Next")}
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};
