import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Progress } from "antd";
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
  TranslationText,
  ArrowLeftAlt1Icon,
} from "@UI";

import { StepperStepType } from "types";
import { Button } from "@UI";
import { runIfFn, useForm } from "utils";
import { useCreateServiceMutation } from "@features/Services/Services/mutation";
import { AccountSignup } from "@features/Auth/views";

export const SellerProfileStartupView: React.FC = ({}) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const [currentStep, setCurrentStep] = React.useState<number>(2);

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

  const steps: StepperStepType[] = [
    {
      stepName: t("Signup"),
      key: 0,
      stepComponent: (
        <AccountSignup
          onSuccess={handleNextStep}
          ref={(v: { submit: () => any }) => {
            if (
              v &&
              typeof v.submit === "function" &&
              typeof submitRequests[0] !== "function"
            ) {
              addSubmitRequest(0, v.submit);
            }
          }}
        />
      ),
    },
    {
      stepName: t("Email Verification"),
      key: 1,
      stepComponent: (
        <AccountSignEmailVerificationStep
          onSuccess={handleNextStep}
          ref={(v: { submit: () => any }) => {
            if (
              v &&
              typeof v.submit === "function" &&
              typeof submitRequests[1] !== "function"
            ) {
              addSubmitRequest(1, v.submit);
            }
          }}
        />
      ),
    },
    {
      key: 2,
      stepComponent: (
        <BillingAccount
          onSuccess={handleNextStep}
          ref={(v: { submit: () => any }) => {
            if (
              v &&
              typeof v.submit === "function" &&
              typeof submitRequests[2] !== "function"
            ) {
              addSubmitRequest(2, v.submit);
            }
          }}
        />
      ),
      stepName: t("Payout"),
    },
    {
      stepName: t("Shop information"),
      stepComponent: <ShopInformationStep />,
      key: 3,
    },
    {
      stepName: t("Verify Your Identity"),
      key: 4,
      stepComponent: <AccountVerifciationForm verificationCode="1354" />,
    },
    {
      stepName: t("Select a plan"),
      stepComponent: (
        <SelectPackageStep shopType="" value="" onChange={() => {}} />
      ),
      key: 5,
    },
    {
      key: 6,
      stepName: t("Listing"),
      stepComponent: <SellerListingForm />,
    },
    {
      stepName: t("Add Payment Method"),
      stepComponent: <PaymentMethodForm />,
      key: 7,
    },
    {
      stepName: t("Shipping Settings", "Shipping Settings"),
      stepComponent: <NewShippingSettings />,
      key: 8,
    },
    {
      stepName: t("Find_your_freinds", "Find your freinds"),
      stepComponent: <FindYourFriendsStep />,
      key: 9,
    },
  ];

  const currentStepComp = steps.at(currentStep) || null;

  return isMobile ? (
    <div className="flex flex-col gap-2 w-full h-full">
      <HStack className="relative justify-between m-4 text-lg font-semibold">
        <button onClick={() => requestPrevStep()}>
          <ArrowLeftAlt1Icon className="" />
        </button>
        <TranslationText translationObject={currentStepComp?.stepName || ""} />
        <button onClick={() => requestSkipStep()}>{t("Skip")}</button>
      </HStack>

      <div className="h-full px-4 overflow-y-scroll">
        {currentStepComp?.stepComponent}
      </div>

      <Button
        className="m-4 text-sm font-normal"
        onClick={() => requestNextStep()}
      >
        {t("Next")}
      </Button>
    </div>
  ) : (
    <>
      <div className="py-28 lg:py-20 h-full">
        <div className="fixed top-0 left-0 z-10 w-full">
          <Container className="">
            <div className="flex items-center justify-between bg-white p-4 lg:hidden">
              <Progress
                type="circle"
                className="stroke-primary"
                percent={((currentStep + 1) / steps.length) * 100}
                width={90}
                strokeWidth={9}
                format={() => currentStep + 1 + " of " + steps.length}
              />
              <div className="flex flex-col items-end">
                <div className="mb-2 text-lg font-bold">
                  {steps[currentStep].stepName}
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
                    <div>{item.stepName}</div>
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

const SellerListingForm = React.forwardRef(
  (
    {
      onSuccess,
    }: {
      onSuccess: () => any;
    },
    ref
  ) => {
    const { t } = useTranslation();

    const { data: shop } = useGetMyShopType();
    const { mutate } = useCreateServiceMutation();

    React.useImperativeHandle(ref, () => {
      return {
        submit: () => {
          mutate({}, { onSuccess });
        },
      };
    });

    return (
      <div className="flex flex-col gap-4 h-full justify-between">
        {/* {shop ? ( */}
        <NewServiceStepper isEdit={false} sellerId={shop?.ownerId || ""} />
        {/* ) : null} */}
      </div>
    );
  }
);

export const AccountSignEmailVerificationStep: React.FC<{
  onSuccess: () => any;
}> = React.forwardRef(({ onSuccess }, ref) => {
  const { form, inputProps } = useForm<Parameters<typeof mutate>[0]>({
    code: "",
  });
  const { mutate } = useVerifyEmailMutation();

  React.useImperativeHandle(ref, () => ({
    submit: () => {
      mutate(form, { onSuccess });
    },
  }));

  return (
    <div className="w-full h-full flex flex-col justify-center  gap-4 items-center">
      <p className="text-xl font-semibold">
        {"An verification code has been sent to your email"}
      </p>
      <div className="p-16 rounded-xl shadow border border-gray-100 ">
        <EmailArrowDownIcon className="text-7xl" />
      </div>
      <Input
        {...inputProps("code")}
        placeholder="123456"
        label="Verification code"
      />
    </div>
  );
});
