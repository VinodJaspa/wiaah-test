import React from "react";
import { PassPropsToChild, runIfFn, MaybeFn } from "utils";

export interface StepperContextValues {
  currentStepIdx: number;
  stepsLength: number;
  setStepsLength: (length: number) => any;
  nextStep: () => any;
  previousStep: () => any;
}

export const StepperContext = React.createContext<StepperContextValues>({
  currentStepIdx: 0,
  stepsLength: 0,
  nextStep: () => {},
  previousStep: () => {},
  setStepsLength: () => {},
});

type StepperPassedProps = StepperContextValues & {
  goToStep: (idx: number) => any;
};

export interface StepperProps {
  children: MaybeFn<StepperPassedProps>;
  controls?: {
    value: number;
    onChange: (idx: number) => any;
  };
}

export const Stepper: React.FC<StepperProps> = ({ children, controls }) => {
  const [currentStepIdx, setCurrentStep] = React.useState<number>(0);
  const [stepsLength, setStepsLength] = React.useState<number>(0);

  function handleNextStep() {
    console.log("next");
    if (controls) {
      controls.onChange(
        controls.value + 1 >= stepsLength ? controls.value : controls.value + 1
      );
      return;
    }
    setCurrentStep((current) => {
      return current + 1 >= stepsLength ? current : current + 1;
    });
  }
  function handlePreviousStep() {
    if (controls) {
      controls.onChange(
        controls.value - 1 < 0 ? controls.value : controls.value - 1
      );
      return;
    }

    setCurrentStep((current) => {
      return current - 1 < 0 ? current : current - 1;
    });
  }

  return (
    <StepperContext.Provider
      value={{
        currentStepIdx: controls ? controls.value : currentStepIdx,
        nextStep: handleNextStep,
        previousStep: handlePreviousStep,
        setStepsLength,
        stepsLength,
      }}
    >
      {runIfFn<StepperPassedProps, React.ReactNode>(children, {
        nextStep: handleNextStep,
        previousStep: handlePreviousStep,
        currentStepIdx,
        setStepsLength,
        stepsLength,
        goToStep: (v) => setCurrentStep(v),
      })}
    </StepperContext.Provider>
  );
};

export interface StepperContentProps {}

export const StepperContent: React.FC<StepperContentProps> = ({
  children: _children,
}) => {
  const children = React.Children.toArray(_children).filter((v) => !!v);
  const { currentStepIdx, setStepsLength } = React.useContext(StepperContext);

  React.useEffect(() => {
    Array.isArray(children)
      ? setStepsLength(children.length)
      : setStepsLength(1);
  }, [children]);

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
