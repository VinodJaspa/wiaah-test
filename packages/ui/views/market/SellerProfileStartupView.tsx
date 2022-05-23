import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useTranslation } from "react-i18next";
import {
  ShopInformationStep,
  SelectPackageStep,
  PaymentPortal,
  NewShippingSettings,
  FindYourFriendsStep,
  AddProfilePictureStep,
  MultiStepFromHandle,
  MultiStepFrom,
  Container,
} from "ui";
import { StepperStepType } from "types";
import { Button } from "ui";

export const SellerProfileStartupView: React.FC = ({}) => {
  const { t } = useTranslation();
  const SellerProfileSteps: StepperStepType[] = [
    {
      stepName: t("Shop_information", "Shop information"),
      stepComponent: ShopInformationStep,
      key: "1",
    },
    {
      stepName: t("Select_a_plan", "Select a plan"),
      stepComponent: SelectPackageStep,
      key: "2",
    },
    {
      stepName: t("Payment_Gate", "Payment Gate"),
      stepComponent: PaymentPortal,
      key: "3",
    },
    {
      stepName: t("Shipping Settings", "Shipping Settings"),
      stepComponent: NewShippingSettings,
      key: "4",
    },
    {
      stepName: t("Find_your_freinds", "Find your freinds"),
      stepComponent: FindYourFriendsStep,
      key: "5",
    },
    {
      stepName: t("Add_Profile_Pic", "Add Profile Pic"),
      stepComponent: AddProfilePictureStep,
      key: "6",
    },
  ];
  const MultiStepFormRef = React.useRef<MultiStepFromHandle>(null);

  return (
    <>
      <div className="py-28 lg:py-20">
        <MultiStepFrom ref={MultiStepFormRef} steps={SellerProfileSteps} />

        <div className="fixed bottom-0 left-0 z-10 flex w-full justify-between bg-white p-4 pt-10 lg:px-8">
          <Container className="flex w-full justify-between">
            <button
              className="flex items-center rounded-md py-2 pl-0 pr-8"
              onClick={() => {
                MultiStepFormRef.current?.handlePrevStep();
              }}
            >
              <MdArrowBackIosNew className="mr-1 inline" />
              {t("Back", "Back")}
            </button>
            <div>
              <button
                className="rounded-md py-2 px-4"
                onClick={() => {
                  MultiStepFormRef.current?.handleSkipStep();
                }}
              >
                {t("Skip", "Skip")}
              </button>
              <Button
                onClick={() => {
                  MultiStepFormRef.current?.handleNextStep();
                }}
              >
                {t("Next", "Next")}
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};
