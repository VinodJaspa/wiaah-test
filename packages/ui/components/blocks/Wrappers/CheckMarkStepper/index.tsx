import React from "react";
import { HtmlDivProps, StepperStepType } from "types";
import { IoCheckmarkCircle } from "react-icons/io5";
import { BiCircle } from "react-icons/bi";
import { TranslationText } from "@UI";
import { runIfFn } from "utils";

export interface CheckMarkStepperProps {
  steps: StepperStepType[];
  currentStepIdx: number;
  onStepChange?: (stepIdx: number) => any;
  className?: string;
  stepHeaderClassName?: string;
}

export const CheckMarkStepper: React.FC<CheckMarkStepperProps> = ({
  steps,
  currentStepIdx,
  onStepChange,
  className,
  stepHeaderClassName,
}) => {
  const CurrentComp = steps[currentStepIdx]
    ? steps[currentStepIdx].stepComponent
    : null;

  function handleGoToStep(step: number) {
    onStepChange && onStepChange(step);
  }

  return (
    <div className={`${className || ""} w-full flex flex-col gap-8`}>
      <div
        className={`${
          stepHeaderClassName || ""
        } w-full relative flex justify-between`}
      >
        <span
          className={`w-full border-b-gray-300 absolute top-1/2 left-0 transition-all -translate-y-1/2 border-b-4`}
        />
        <span
          style={{
            width: `${(currentStepIdx / (steps.length - 1)) * 100}%`,
          }}
          className={`border-b-primary absolute top-1/2 left-0 transition-all -translate-y-1/2 border-b-4`}
        />
        {steps.map((step, i) => (
          <div
            key={step.key + i}
            onClick={() => handleGoToStep(i)}
            className="cursor-pointer text-xl relative flex flex-col"
          >
            {currentStepIdx > i ? (
              <IoCheckmarkCircle className="bg-white text-primary" />
            ) : (
              <BiCircle
                className={`bg-white ${
                  currentStepIdx === i ? "text-primary" : "text-gray-300"
                } `}
              />
            )}
            <TranslationText
              className={`${
                currentStepIdx === i ? "" : "hidden sm:block"
              } absolute text-xs sm:text-sm  top-full whitespace-nowrap ${
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
      {runIfFn(CurrentComp, {})}
    </div>
  );
};
