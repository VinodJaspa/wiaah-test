
import { CircularProgressbar } from "react-circular-progressbar";

import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "ui";
import { StepperStepType } from "types";
import { runIfFn } from "utils";

export type MultiStepFromHandle = {
  handleNextStep: () => any;

  handlePrevStep: () => any;

  handleSkipStep: () => any;
};

export type FormStepIsValidData = null | Record<string, any>;

export interface MultiStepFromProps {
  steps: StepperStepType[];
}

const Formcomponent: React.ForwardRefRenderFunction<
  MultiStepFromHandle,
  MultiStepFromProps
> = ({ steps }, ref) => {
const { t } = useTranslation();

  React.useImperativeHandle(ref, () => ({
    handleNextStep,

    handlePrevStep,

    handleSkipStep,
  }));

  const [stepsData, setStepsData] = React.useState<FormStepIsValidData[]>([]);

  const primaryColor = "var(--primary-main)"
    
  let [formStep, setFormStep] = React.useState(4);

  const CanNext = stepsData[formStep] !== null;

  function handleNextStep() {
    if (CanNext) {
      setFormStep((step) => {
        if (step < steps.length - 1) {
          return step + 1;
        }

        return step;
      });
    }
  }

  function handleSkipStep() {
    setFormStep((step) => {
      if (step < steps.length - 1) {
        return step + 1;
      }

      return step;
    });
  }

  function handlePrevStep() {
    setFormStep((step) => {
      if (step > 0) {
        return step - 1;
      }

      return step;
    });
  }

  function handleFormStepValid(data: FormStepIsValidData, i: number) {
    const existingData = JSON.stringify(stepsData[i]);
    const newData = JSON.stringify(data);
    if (existingData === newData) return;
    const newStepsData = [...stepsData];
    newStepsData[i] = data;
    setStepsData(newStepsData);
  }
  const percentage = ((formStep + 1) / steps.length) * 100;
  return (
    <>
      <div className="fixed top-0 left-0 z-10 w-full">
        <Container className="">
          <div className="flex items-center justify-between bg-white p-4 lg:hidden">
            <CircularProgressbar
              value={percentage}
              text={`${formStep + 1} of ${steps.length}`}
              styles={{
                path: {
                  stroke: primaryColor,
                  strokeLinecap: "round",
                  transition: "stroke-dashoffset 0.5s ease 0s",
                },
                trail: {
                  stroke: "#e5e7eb", // Tailwind's gray-200
                },
                text: {
                  fill: "#000", // Or choose text color
                  fontSize: "16px",
                  fontWeight: "bold",
                },
              }}
            />
            <div className="flex flex-col items-end">
              <div className="mb-2 text-lg font-bold">
                {steps[formStep].stepName.toString()}
              </div>
              <div className="text-xs text-gray-400">
                {steps[formStep + 1]
                  ? "Next: " + steps[formStep + 1].stepName
                  : t("Finalisation", "Finalisation")}
              </div>
            </div>
          </div>
          <div className="hidden items-stretch justify-start bg-gray-200 lg:flex">
            {steps.map((item, key) => {
              return (
                <div
                  key={key}
                  className={`${formStep == key ? "bg-primary text-white" : ""
                    } flex w-4/12 flex-col justify-center px-6 py-4`}
                >
                  <div className="text-lg font-bold">
                    {t("Step", "Step")} {key + 1}
                  </div>
                  <div>{item.stepName.toString()}</div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
      <div className="overflow-scroll thinScroll h-full px-4 py-4 md:pl-8 md:py-8">
        {steps.map((step, i) => {
          if (formStep !== i) return null;
          const Comp = step.stepComponent;
          return (
            <React.Fragment key={i}>
              {runIfFn(Comp, {
                isValid: (data: FormStepIsValidData) => {
                  handleFormStepValid(data, i);
                },
              })}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export const MultiStepFrom = React.forwardRef(Formcomponent);

// ({
// isValid: (data: FormStepIsValidData) =>
// handleFormStepValid(data, i),
// })}
