import React from "react";
import { FlagIcon, FlagIconCode } from "react-flag-kit";
import { useTranslation } from "react-i18next";
import { StepperStepType } from "types";
import {
  CheckMarkStepper,
  ProductGeneralDetails,
  Button,
  ProductOptions,
  NewProductShippingOptions,
  NewProductDiscountOptions,
  SectionHeader,
  Tabs,
  TabList,
  TabTitle,
  TabsHeader,
  TabItem,
  StepperFormController,
  StepperFormHandler,
  AddNewDigitalProductSection,
} from "ui";
import { mapArray, PassPropsToFnOrElem, runIfFn } from "utils";

export interface AddNewProductSectionProps {}

export const AddNewProductSection: React.FC<AddNewProductSectionProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col gap-4 w-full">
      <SectionHeader sectionTitle={t("add_product", "Add Product")} />
      {/* stepper */}
      <Tabs>
        <>
          <TabsHeader className="flex-wrap justify-center sm:justify-start" />

          {addProductLanguagesSection.map((section, i) => (
            <React.Fragment key={i}>
              <TabTitle TabKey={i}>
                {({ currentTabIdx }) => (
                  <div
                    className={`${
                      currentTabIdx === i ? "border-primary" : "border-gray-300"
                    } flex items-center gap-2 border-b-[1px] shadow p-2`}
                  >
                    <FlagIcon code={section.language.countryCode} />
                    <span className="hidden sm:block">
                      {section.language.name}
                    </span>
                  </div>
                )}
              </TabTitle>
              <TabItem key={i}>{section.section({})}</TabItem>
            </React.Fragment>
          ))}

          <TabList />
        </>
      </Tabs>
    </div>
  );
};
export const NewProductInputsSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-4 h-full w-full flex-col justify-between">
      <StepperFormController
        lock={false}
        onFormComplete={() => {}}
        stepsNum={steps.length}
      >
        {({ currentStepIdx, goToStep, nextStep, values }) => {
          return (
            <>
              <CheckMarkStepper
                currentStepIdx={currentStepIdx}
                onStepChange={(step) => goToStep(step)}
                steps={mapArray(steps, ({ key, stepComponent, stepName }) =>
                  key === "shipping" &&
                  values["product_type"] === "downloadable"
                    ? {
                        key: "files",
                        stepComponent: () => (
                          <StepperFormHandler handlerKey="files">
                            {({ validate }) => (
                              <AddNewDigitalProductSection
                                onChange={validate}
                              />
                            )}
                          </StepperFormHandler>
                        ),
                        stepName: "Files",
                      }
                    : {
                        key,
                        stepName,
                        stepComponent: () => (
                          <StepperFormHandler handlerKey={key}>
                            {({ validate }) => (
                              <>
                                {PassPropsToFnOrElem(stepComponent, {
                                  onChange: validate,
                                })}
                              </>
                            )}
                          </StepperFormHandler>
                        ),
                      }
                )}
              />
              <div className="w-full flex justify-end gap-4">
                <Button className="bg-gray-100 hover:bg-gray-300 active:bg-gray-400 text-black">
                  {t("preview", "preview")}
                </Button>
                <Button
                  onClick={() => {
                    console.log("clicked");
                    nextStep();
                  }}
                >
                  {t("save and continue", "Save and continue")}
                </Button>
              </div>
            </>
          );
        }}
      </StepperFormController>
    </div>
  );
};
const steps: StepperStepType[] = [
  {
    stepName: {
      translationKey: "general",
      fallbackText: "General",
    },
    stepComponent: (props: any) => <ProductGeneralDetails {...props} />,
    key: "general",
  },
  {
    stepName: {
      translationKey: "shipping",
      fallbackText: "Shipping",
    },
    stepComponent: (props: any) => <NewProductShippingOptions {...props} />,
    key: "shipping",
  },
  {
    stepName: {
      translationKey: "options",
      fallbackText: "Options",
    },
    stepComponent: (props: any) => <ProductOptions {...props} />,
    key: "options",
  },
  {
    stepName: {
      translationKey: "special_discount",
      fallbackText: "Special Discount",
    },
    stepComponent: (props: any) => <NewProductDiscountOptions {...props} />,
    key: "special discount",
  },
];

const addProductLanguagesSection: {
  language: {
    name: string;
    countryCode: FlagIconCode;
  };
  section: React.FunctionComponent;
}[] = [
  {
    language: {
      name: "English",
      countryCode: "GB",
    },
    section: NewProductInputsSection,
  },
  {
    language: {
      name: "French",
      countryCode: "FR",
    },
    section: NewProductInputsSection,
  },
  {
    language: {
      name: "German",
      countryCode: "DE",
    },
    section: NewProductInputsSection,
  },
  {
    language: {
      name: "Spanish",
      countryCode: "ES",
    },
    section: NewProductInputsSection,
  },
];
