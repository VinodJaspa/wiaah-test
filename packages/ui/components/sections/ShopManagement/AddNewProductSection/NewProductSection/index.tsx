import React from "react";
import { useTranslation } from "react-i18next";
import { StepperStepType } from "types";
import {
  useEditProductData,
  CheckMarkStepper,
  ProductGeneralDetails,
  Button,
  ProductOptions,
  NewProductShippingOptions,
  NewProductDiscountOptions,
} from "ui";

export interface AddNewProductSectionProps {}

export const AddNewProductSection: React.FC<AddNewProductSectionProps> = () => {
  const { product } = useEditProductData();
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col gap-4 w-full">
      <div className="border-b-2 py-2 border-b-primary w-full">
        <h1 className="font-bold text-4xl">
          {t("add_product", "Add Product")}
        </h1>
      </div>
      {/* stepper */}
      <div className="flex gap-4 h-full flex-col justify-between">
        <CheckMarkStepper currentStep="options" steps={steps} />
        <div className="w-full flex justify-end gap-4">
          <Button className="bg-gray-100 hover:bg-gray-300 active:bg-gray-400 text-black">
            {t("preview", "preview")}
          </Button>
          <Button>{t("save and continue", "Save and continue")}</Button>
        </div>
      </div>
    </div>
  );
};

const steps: StepperStepType[] = [
  {
    stepName: {
      translationKey: "general",
      fallbackText: "General",
    },
    stepComponent: () => <ProductGeneralDetails />,
    key: "general",
  },
  {
    stepName: {
      translationKey: "shipping",
      fallbackText: "Shipping",
    },
    stepComponent: () => <NewProductShippingOptions />,
    key: "shipping",
  },
  {
    stepName: {
      translationKey: "options",
      fallbackText: "Options",
    },
    stepComponent: () => <ProductOptions />,
    key: "options",
  },
  {
    stepName: {
      translationKey: "special_discount",
      fallbackText: "Special Discount",
    },
    stepComponent: () => <NewProductDiscountOptions />,
    key: "special discount",
  },
];
