import React from "react";
import { StepperStepType } from "types";
import { PassPropsToChild } from "../Modal";

export interface StepperContextValues {
  currentStepIdx: number;
  nextStep: () => any;
  previousStep: () => any;
}

export const StepperContext = React.createContext<StepperContextValues>({
  currentStepIdx: 0,
  nextStep: () => {},
  previousStep: () => {},
});
type MaybeFn<T> = React.ReactNode | ((props: T) => React.ReactNode);

type StepperPassedProps = StepperContextValues & {};

export interface StepperProps {
  children: MaybeFn<StepperPassedProps>;
  stepsLength: number;
}

function runIfFn<T, P>(valueOrFn: T, props: P): T {
  const isFn = typeof valueOrFn === "function";
  return isFn ? valueOrFn(props) : valueOrFn;
}

export const Stepper: React.FC<StepperProps> = ({ stepsLength, children }) => {
  const [currentStepIdx, setCurrentStep] = React.useState<number>(0);

  function handleNextStep() {
    setCurrentStep((current) => {
      return current + 1 >= stepsLength ? current : current + 1;
    });
  }
  function handlePreviousStep() {
    setCurrentStep((current) => {
      return current - 1 < 0 ? current : current - 1;
    });
  }
  return (
    <StepperContext.Provider
      value={{
        currentStepIdx,
        nextStep: handleNextStep,
        previousStep: handlePreviousStep,
      }}
    >
      {runIfFn<MaybeFn<StepperPassedProps>, StepperPassedProps>(children, {
        nextStep: handleNextStep,
        previousStep: handlePreviousStep,
        currentStepIdx,
      })}
    </StepperContext.Provider>
  );
};

export interface StepperContentProps {}

export const StepperContent: React.FC<StepperContentProps> = ({ children }) => {
  const { currentStepIdx } = React.useContext(StepperContext);

  const Comp = Array.isArray(children) ? children[currentStepIdx] : children;
  return <>{Comp ? runIfFn(Comp, {}) : Comp}</>;
};

export interface StepperHeaderProps {}

export const StepperHeader: React.FC<StepperContentProps> = ({ children }) => {
  return <>{children}</>;
};

export const StepperNextButton: React.FC = ({ children }) => {
  const { nextStep } = React.useContext(StepperContext);
  return <>{PassPropsToChild(children, { onClick: nextStep })}</>;
};

export const StepperPreviousButton: React.FC = ({ children }) => {
  const { previousStep } = React.useContext(StepperContext);
  return <>{PassPropsToChild(children, { onClick: previousStep })}</>;
};
