import React from "react";
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
} from "@UI";

import { StepperStepType } from "types";
import { Button } from "@UI";
import { runIfFn, useForm, WiaahLangId } from "utils";
import { useCreateServiceMutation } from "@features/Services/Services/mutation";
import { AccountSignup } from "@features/Auth/views";
import { useSubscribeToMembershipMutation } from "@features/Membership";
import { DoctorSpeakingLanguage, StoreType } from "@features/API";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
interface StepperProps {
  setFormSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  isFormSubmitting: boolean;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}


export const SellerProfileStartupView: React.FC<StepperProps> = ({ currentStep, setCurrentStep, isFormSubmitting, setFormSubmitting }) => {


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
    if (typeof submitFn === "function") {
      setFormSubmitting(true);
      try {
        await submitFn(); // assume it's a Promise
      } finally {
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
          <AccountSignup
            onSuccess={handleNextStep}
            ref={(v: { submit: () => any }) => {
              if (v && typeof v.submit === "function") {
                addSubmitRequest(0, v.submit);
              }
            }}
          />
        ),
      },
      {
        stepName: t("Email Verification") as string,
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
        key: 2,
        stepComponent: (
          <BillingAccount
            onSuccess={handleNextStep}
            ref={(v: { submit: () => any }) => {
              if (v && typeof v.submit === "function") {
                addSubmitRequest(2, v.submit);
              }
            }}
          />
        ),
        stepName: t("Payout"),
      },
      {
        stepName: t("Shop information"),
        stepComponent: (
          <ShopInformationStep
            ref={(v: { submit: () => any }) => {
              if (v && typeof v.submit === "function") {
                addSubmitRequest(3, v.submit);
              }
            }}
            onSuccess={handleNextStep}
          />
        ),
        key: 3,
      },
      {
        stepName: t("Verify Your Identity"),
        key: 4,
        stepComponent: (
          <SignupAccountVerificationStep
            ref={(v: { submit: () => any }) => {
              if (v && typeof v.submit === "function") {
                addSubmitRequest(4, v.submit);
              }
            }}
            onSuccess={handleNextStep}
          />
        ),
      },
      {
        stepName: t("Select a plan"),
        stepComponent: (
          <SellerSignupPlansStep
            ref={(v: { submit: () => any }) => {
              if (v && typeof v.submit === "function") {
                addSubmitRequest(5, v.submit);
              }
            }}
            onSuccess={handleNextStep}
          />
        ),
        key: 5,
      },
      {
        key: 6,
        stepName: t("Listing"),
        stepComponent: (
          <SellerListingForm
            ref={(v: { submit: () => any }) => {
              if (v && typeof v.submit === "function") {
                addSubmitRequest(6, v.submit);
              }
            }}
            onSuccess={handleNextStep}
          />
        ),
      },
      {
        stepName: t("Add Payment Method"),
        stepComponent: (
          <PaymentMethodForm
            ref={(v: { submit: () => any }) => {
              if (v && typeof v.submit === "function") {
                addSubmitRequest(7, v.submit);
              }
            }}
            onSuccess={handleNextStep}
          />
        ),
        key: 7,
      },
      {
        stepName: t("Shipping Settings"),
        stepComponent: (
          <NewShippingSettings
            ref={(v: { submit: () => any }) => {
              if (v && typeof v.submit === "function") {
                addSubmitRequest(8, v.submit);
              }
            }}
            onSuccess={handleNextStep}
          />
        ),
        key: 8,
      },
      {
        stepName: t("Find your freinds"),
        stepComponent: (
          <FindYourFriendsStep
            ref={(v: { submit: () => any }) => {
              if (v && typeof v.submit === "function") {
                addSubmitRequest(9, v.submit);
              }
            }}
            onSuccess={handleNextStep}
          />
        ),
        key: 9,
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
          <p className="text-xs text-primary bg-primary">
            {t("Next") as string} : {nextStep?.stepName.toString()}
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
          className="m-4 text-sm font-normal bg-primary"
          onClick={() => requestNextStep()}

        >
          <HStack>
            <p >{t("Next")}</p>
            <ArrowRightAltIcon />
          </HStack>
        </Button>
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

                <button
                  className="rounded-md py-2 px-4"
                  disabled={currentStep === 0 || currentStep == 1}
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

export const AccountSignEmailVerificationStep = React.forwardRef(
  (
    {
      onSuccess,
    }: {
      onSuccess: () => any;
    },
    ref
  ) => {
    const { t } = useTranslation();
    const { form, inputProps } = useForm<Parameters<typeof mutate>[0]>({
      code: "",
    });
    const { mutate } = useVerifyEmailMutation();
    const { mutate: resendCode } = useResendRegisterationCodeMutation();
    const { data: user } = useGetMyAccountQuery();
    const [cooldown, setCooldown] = React.useState(0);

    React.useEffect(() => {
      if (cooldown > 0) {
        const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
        return () => clearTimeout(timer);
      }

      // Always return something (even if it's just undefined)
      return undefined;
    }, [cooldown]);

    const handleResend = () => {
      resendCode();
      setCooldown(8);
    }
    React.useImperativeHandle(ref, () => ({
      submit: () => {
        mutate(form, { onSuccess });
      },
    }));
    const { isMobile } = useResponsive();

    return isMobile ? (
      <div className="h-full w-full flex flex-col justify-center items-center gap-10">
        <p className="text-xl font-sm text-center">
          {t("An verification code has been sent to your email")}. (
          {user?.email})
        </p>

        <label>
          <Input
            className="absolute opacity-0 pointer-events-none"
            {...inputProps("code")}
          />
          <div className="flex items-center gap-4">
            {[...Array(6)].map((v, i) => (
              <div
                className={`w-12 h-12 rounded-lg ${typeof form.code.at(i) === "string"
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-black text-black"
                  } text-sm border flex justify-center items-center`}
              >
                <p>{form.code.at(i)}</p>
              </div>
            ))}
          </div>
        </label>

        <div className="flex flex-col gap-2">
          <p>{t("Didn’t receive code?")}</p>
          <button
            onClick={() => handleResend()}
            className="text-primary font-sm"
          >
            {t("RESEND")}
          </button>
        </div>

        <Button className="w-full bg-primary">
          {t("Verify")}
        </Button>
      </div>
    ) : (
      <div className="w-full h-full flex flex-col justify-center  gap-4 items-center">
        <p className="text-xl font-sm">
          {t("An verification code has been sent to your email")}. (
          {user?.email})
        </p>
        <div className="p-16 rounded-xl shadow border border-gray-100 ">
          <EmailArrowDownIcon className="text-7xl" />
        </div>
        <Input
          {...inputProps("code")}
          placeholder="123456"
          label="Verification code"
        />

        <div className="flex flex-col gap-2">
          <p>{t("Didn’t receive code?")}</p>
          <button
            onClick={() => handleResend()}
            className="text-primary font-sm"
          >
            {t("RESEND")}
          </button>
        </div>
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
