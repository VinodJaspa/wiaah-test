import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Progress } from "antd";
import {
  ShopInformationStep,
  SelectPackageStep,
  PaymentPortal,
  NewShippingSettings,
  FindYourFriendsStep,
  Container,
  StepperFormController,
  StepperFormHandler,
  CheckMarkStepper,
  NewProductDiscountOptions,
  ServiceGeneralDetails,
  IncludedServices,
  ExtraServiceOptions,
  RestaurantServiceDetailsForm,
  HealthCenterServiceDetailsForm,
  VehicleServiceDetailsForm,
  BeautyCenterServiceDetailsForm,
  RestaurantIncludedServicesSection,
  HolidayRentalsGeneralDetailsForm,
  HealthCenterIncludedServices,
  ServiceSectionWithSchemaType,
  MyVerificationSection,
  BillingAccount,
  ServicePoliciesInputSection,
  NewServiceStepper,
  useGetMyShopType,
} from "@UI";

import { ServicesType, StepperStepType } from "types";
import { Button } from "@UI";
import { runIfFn } from "utils";
import { NewServiceSchemas } from "validation";
import { useCreateServiceMutation } from "@features/Services/Services/mutation";
import { AccountSignup } from "@features/Auth/views";
import { ServiceType } from "@features/API";

export const SellerProfileStartupView: React.FC = ({}) => {
  const { t } = useTranslation();
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
    // {
    //   stepName: t("Email Verification"),
    //   key: 1,
    //   stepComponent: (
    //     <AccountSignup
    //       onSuccess={handleNextStep}
    //       ref={(v: { submit: () => any }) => {
    //         if (
    //           v &&
    //           typeof v.submit === "function" &&
    //           typeof submitRequests[1] !== "function"
    //         ) {
    //           addSubmitRequest(1, v.submit);
    //         }
    //       }}
    //     />
    //   ),
    // },
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
      stepComponent: <MyVerificationSection />,
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
      stepName: t("Payment_Gate", "Payment Gate"),
      stepComponent: <PaymentPortal />,
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

  return (
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
        <div className="overflow-scroll thinScroll h-full pl-4 py-4 md:pl-8 md:py-8">
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
          mutate();
        },
      };
    });

    return (
      <div className="flex flex-col gap-4 h-full justify-between">
        {shop ? (
          <NewServiceStepper isEdit={false} sellerId={shop?.ownerId} />
        ) : null}
      </div>
    );
  }
);
