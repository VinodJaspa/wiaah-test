import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useTranslation } from "react-i18next";
import {
  MultiStepFrom,
  PersonalInformationStep,
  FindYourFriendsStep,
  Container,
  Button,
} from "ui";
import { StepperStepType } from "types";
import { AddProfilePictureStep, MultiStepFromHandle } from "../../components";

export const BuyerProfileStartUpView: React.FC = ({}) => {
  const { t } = useTranslation();

  const multiStepFormRef = React.useRef<MultiStepFromHandle>(null);

  const BuyerSignupSteps: StepperStepType[] = [
    {
      stepName: t("Personal_information", "Personal information"),
      stepComponent: PersonalInformationStep,
      key: "1",
    },
    {
      stepName: t("Find_your_freinds", "Find your freinds"),

      stepComponent: FindYourFriendsStep,
      key: "2",
    },
    {
      stepName: t("Add_Profile_Pic", "Add Profile Pic"),
      stepComponent: AddProfilePictureStep,
      key: "3",
    },
  ];

  return (
    <>
      <div className="py-28 lg:py-20">
        <MultiStepFrom ref={multiStepFormRef} steps={BuyerSignupSteps} />
        <div className="fixed bottom-0 left-0 z-10 flex w-full justify-between bg-white p-4 pt-10 md:px-8">
          <Container className="flex w-full justify-between">
            <button
              className="flex items-center rounded-md py-2 pl-0 pr-8"
              onClick={() => {
                multiStepFormRef.current?.handlePrevStep();
              }}
            >
              <MdArrowBackIosNew className="mr-1 inline" />
              {t("Back", "Back")}
            </button>
            <div>
              <button
                className="rounded-md py-2 px-4"
                onClick={() => {
                  multiStepFormRef.current?.handleSkipStep();
                }}
              >
                {t("Skip", "Skip")}
              </button>
              <Button
                onClick={() => {
                  multiStepFormRef.current?.handleNextStep();
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
