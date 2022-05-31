import React from "react";
import { StepperStepType } from "types";
import { IoCheckmarkCircle } from "react-icons/io5";
import { BiCircle } from "react-icons/bi";
import { TranslationText, FormStepIsValidData } from "ui";

export interface CheckMarkStepperProps {
  steps: StepperStepType[];
  currentStep: string;
  onStepChange?: (stepKey: string) => any;
}

export const CheckMarkStepper: React.FC<CheckMarkStepperProps> = ({
  steps,
  currentStep,
}) => {
  const [step, setStep] = React.useState<string>(currentStep);

  const stepIdx = steps.findIndex((Step) => Step.key === step);

  const CurrentComp = steps[stepIdx] ? steps[stepIdx].stepComponent : null;

  function handleFormStepValid(data: FormStepIsValidData, i: number) {
    // const existingData = JSON.stringify(stepsData[i]);
    // const newData = JSON.stringify(data);
    // if (existingData === newData) return;
    // const newStepsData = [...stepsData];
    // newStepsData[i] = data;
    // setStepsData(newStepsData);
  }

  function handleGoToStep(step: string) {
    setStep(step);
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full relative flex justify-between">
        <span
          className={`w-full border-b-gray-300 absolute top-1/2 left-0 transition-all -translate-y-1/2 border-b-4`}
        />
        <span
          style={{
            width: `${(stepIdx / (steps.length - 1)) * 100}%`,
          }}
          className={`border-b-primary absolute top-1/2 left-0 transition-all -translate-y-1/2 border-b-4`}
        />
        {steps.map((step, i) => (
          <div
            key={step.key + i}
            onClick={() => handleGoToStep(step.key)}
            className="cursor-pointer text-xl relative flex flex-col"
          >
            {stepIdx > i ? (
              <IoCheckmarkCircle className="bg-white text-primary" />
            ) : (
              <BiCircle
                className={`bg-white ${
                  stepIdx === i ? "text-primary" : "text-gray-300"
                } `}
              />
            )}
            <TranslationText
              className={`absolute text-xs sm:text-sm  top-full whitespace-nowrap ${
                steps.length === i + 1
                  ? "right-0"
                  : i === 0
                  ? "left-0"
                  : "-translate-x-1/2 left-1/2"
              }`}
              translationObject={step.stepName}
            />
          </div>
        ))}
      </div>
      {CurrentComp && (
        <CurrentComp
          isValid={(data: FormStepIsValidData) => {
            handleFormStepValid(data, stepIdx);
          }}
        />
      )}
    </div>
  );
};
