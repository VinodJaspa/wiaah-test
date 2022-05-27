import { Menu } from "@chakra-ui/react";
import { Formik } from "formik";
import { NextPage } from "next";
import React from "react";
import { StepperStepType } from "types";
import {
  Button,
  NewProductDiscountOptions,
  NewProductShippingOptions,
  ProductGeneralDetails,
  ProductOptions,
  Stepper,
  StepperContent,
  StepperHeader,
  StepperNextButton,
  StepperPreviousButton,
} from "ui";

const preview: NextPage = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <div className="flex w-full h-full justify-center items-center">
      <Stepper stepsLength={4}>
        {({ nextStep, currentStepIdx, previousStep }) => {
          return (
            <div className="w-full min-h-screen justify-between flex flex-col gap-12">
              <StepperContent />
              <div className="hstack justify-between">
                <StepperPreviousButton>
                  <Button>previous</Button>
                </StepperPreviousButton>
                <StepperNextButton>
                  <Button>next</Button>
                </StepperNextButton>
              </div>
            </div>
          );
        }}
      </Stepper>
    </div>
  );
};

export default preview;

const steps: StepperStepType[] = [
  {
    stepName: {
      translationKey: "general",
      fallbackText: "General",
    },
    stepComponent: <ProductGeneralDetails />,
    key: "general",
  },
  {
    stepName: {
      translationKey: "shipping",
      fallbackText: "Shipping",
    },
    stepComponent: <NewProductShippingOptions />,
    key: "shipping",
  },
  {
    stepName: {
      translationKey: "options",
      fallbackText: "Options",
    },
    stepComponent: <ProductOptions />,
    key: "options",
  },
  {
    stepName: {
      translationKey: "special_discount",
      fallbackText: "Special Discount",
    },
    stepComponent: <NewProductDiscountOptions />,
    key: "special discount",
  },
];
