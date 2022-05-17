import React from "react";
import { useTranslation } from "react-i18next";
import { StepperStepType } from "types";
import {
  useEditProductData,
  CheckMarkStepper,
  ProductGeneralDetails,
  ShippingSettings,
} from "ui";

export interface AddNewProductSectionProps {}

export const AddNewProductSection: React.FC<AddNewProductSectionProps> = () => {
  const { product } = useEditProductData();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="border-b-2 py-2 border-b-primary w-full">
        <h1 className="font-bold text-4xl">
          {t("add_product", "Add Product")}
        </h1>
      </div>
      {/* stepper */}
      <CheckMarkStepper currentStep="options" steps={steps} />
    </div>
  );
};

const steps: StepperStepType[] = [
  {
    stepName: {
      translationKey: "general",
      fallbackText: "General",
    },
    stepComponent: () => (
      <>
        <ProductGeneralDetails />
      </>
    ),
    key: "general",
  },
  {
    stepName: {
      translationKey: "shipping",
      fallbackText: "Shipping",
    },
    stepComponent: () => <ShippingSettings />,
    key: "shipping",
  },
  {
    stepName: {
      translationKey: "options",
      fallbackText: "Options",
    },
    stepComponent: () => <>Options</>,
    key: "options",
  },
  {
    stepName: {
      translationKey: "special_discount",
      fallbackText: "Special Discount",
    },
    stepComponent: () => <>Speical Discount</>,
    key: "special discount",
  },
];
