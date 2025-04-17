import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { StorybookImplemntationLayout } from "utils";
import {
  Stepper,
  StepperContent,
  StepperNextButton,
  StepperPreviousButton,
  StepperProps,
} from "./";
import { Button } from "@UI";

export default {
  title: "UI / partials / Stepper",
  component: Stepper,
} as Meta<typeof Stepper>;

export const Default: React.FC<StepperProps> = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
        import {
        Stepper,
        StepperContent,
        StepperNextButton,
        StepperPreviousButton,
        Button
        } from "@UI";

        ...
        return (
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <Stepper>
            <StepperContent>
              <div className="w-1/2 h-48 bg-green-200">step 1</div>
              <div className="w-1/2 h-48 bg-green-200">step 2</div>
              <div className="w-1/2 h-48 bg-green-200">step 3</div>
            </StepperContent>
            <div className="w-1/2 flex items-center justify-between">
              <StepperPreviousButton>
                <Button>Previous</Button>
              </StepperPreviousButton>
              <StepperNextButton>
                <Button>Next</Button>
              </StepperNextButton>
            </div>
          </Stepper>
        </div>
        )
        `}
    >
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <Stepper>
          <StepperContent>
            <div className="w-1/2 h-48 bg-green-200">step 1</div>
            <div className="w-1/2 h-48 bg-green-200">step 2</div>
            <div className="w-1/2 h-48 bg-green-200">step 3</div>
          </StepperContent>
          <div className="w-1/2 flex items-center justify-between">
            <StepperPreviousButton>
              <Button>Previous</Button>
            </StepperPreviousButton>
            <StepperNextButton>
              <Button>Next</Button>
            </StepperNextButton>
          </div>
        </Stepper>
      </div>
    </StorybookImplemntationLayout>
  );
};

export const WithInnerContextAccess: React.FC<StepperProps> = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import {
Stepper,
StepperContent,
StepperNextButton,
StepperPreviousButton,
Button
} from "@UI";

...
return (
<div className="flex flex-col gap-4 justify-center items-center w-full">
    <Stepper stepsLength={3}>
      {({ currentStepIdx, nextStep, previousStep }) => {
        return (
          <>
            <span className="text-xl font-bold">
              Current Step index {currentStepIdx}
            </span>
            <StepperContent>
              <div className="w-1/2 h-48 flex justify-between bg-green-200">
                step 1<Button className="h-fit" onClick={nextStep}>go to next step</Button>
              </div>
              <div className="w-1/2 h-48 bg-green-200">step 2</div>
              <div className="w-1/2 h-48 bg-green-200">step 3</div>
            </StepperContent>
            <div className="w-1/2 flex items-center justify-between">
              <Button onClick={previousStep}>Previous</Button>
              <Button onClick={nextStep}>Next</Button>
            </div>
          </>
        );
      }}
    </Stepper>
</div>
)
        `}
    >
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <Stepper>
          {({ currentStepIdx, nextStep, previousStep }) => {
            return (
              <>
                <span className="text-xl font-bold">
                  Current Step index {currentStepIdx}
                </span>
                <StepperContent>
                  <div className="w-1/2 h-48 flex justify-between bg-green-200">
                    step 1
                    <Button className="h-fit" onClick={nextStep}>
                      go to next step
                    </Button>
                  </div>
                  <div className="w-1/2 h-48 bg-green-200">step 2</div>
                  <div className="w-1/2 h-48 bg-green-200">step 3</div>
                </StepperContent>
                <div className="w-1/2 flex items-center justify-between">
                  <Button onClick={previousStep}>Previous</Button>
                  <Button onClick={nextStep}>Next</Button>
                </div>
              </>
            );
          }}
        </Stepper>
      </div>
    </StorybookImplemntationLayout>
  );
};
