import React from "react";
import { useTranslation } from "react-i18next";
import { StepperStepType } from "types";
import {
  CheckMarkStepper,
  Button,
  ProductOptions,
  NewProductShippingOptions,
  NewProductDiscountOptions,
  SectionHeader,
  Tabs,
  TabTitle,
  TabsHeader,
  TabsContext,
  StepperFormController,
  StepperFormHandler,
  AddNewDigitalProductSection,
  FormTranslationWrapper,
  useCreateNewProductMutation,
  useEditProductData,
  FlagIcon,
} from "@UI";
import { ProductGeneralDetails } from "@blocks";
import { mapArray, PassPropsToFnOrElem } from "utils";

export interface AddNewProductSectionProps { }

const addProductLanguagesSection = [
  {
    language: {
      name: "English",
      countryCode: "GB",
    },
  },
  {
    language: {
      name: "French",
      countryCode: "FR",
    },
  },
  {
    language: {
      name: "German",
      countryCode: "DE",
    },
  },
  {
    language: {
      name: "Spanish",
      countryCode: "ES",
    },
  },
];

export const AddNewProductSection: React.FC<AddNewProductSectionProps> =
  React.memo(() => {
    const { t } = useTranslation();
    const { cancel } = useEditProductData();
    const { mutate } = useCreateNewProductMutation();
    const [lang, setLang] = React.useState("en");

    const handleTabChange = React.useCallback(
      (index: number) => {
        const currLang = addProductLanguagesSection[index].language.countryCode;
        setLang(currLang);
      },
      [setLang]
    );

    console.log("LANGUAGE =====>  " + lang);

    return (
      <div className="flex h-full flex-col gap-4 w-full">
        <SectionHeader sectionTitle={t("Add Product")} />
        {/* stepper */}
        <Tabs>
          <TabsHeader className="flex-wrap justify-center sm:justify-start" />
          {addProductLanguagesSection.map((section, i) => (
            <MemoizedTabTitle
              key={i}
              TabKey={i}
              section={section}
              handleTabChange={handleTabChange}
            />
          ))}
        </Tabs>

        <FormTranslationWrapper lang={lang} onLangChange={setLang}>
          <NewProductInputsSection
            onSubmit={(data) => {
              console.log("Lang ================> " + lang);
              console.log("PRODUCT DATA ====> " + JSON.stringify(data));
              mutate(data);
              cancel();
            }}
          />
        </FormTranslationWrapper>
      </div>
    );
  });

const MemoizedTabTitle: React.FC<{
  TabKey: number;
  section: (typeof addProductLanguagesSection)[0];
  handleTabChange: (index: number) => void;
}> = ({ TabKey, section, handleTabChange }) => {
  // Assuming `currentTabIdx` is being passed as a prop or from context
  const { currentTabIdx } = React.useContext(TabsContext); // Example using context, or pass it as a prop
  // Only call handleTabChange when the currentTabIdx changes to the TabKey
  React.useEffect(() => {
    if (currentTabIdx === TabKey) {
      handleTabChange(TabKey);
    }
  }, [currentTabIdx, handleTabChange]);

  return (
    <TabTitle TabKey={TabKey}>
      <div
        className={`${currentTabIdx === TabKey ? "border-primary" : "border-gray-300"
          } flex items-center gap-2 border-b-[1px] shadow p-2`}
      >
        <FlagIcon code={section.language.countryCode} />
        <span className="hidden sm:block">{section.language.name}</span>
      </div>
    </TabTitle>
  );
};

export const NewProductInputsSection: React.FC<{
  onSubmit: (data: any) => any;
}> = React.memo(({ onSubmit }) => {
  const steps: StepperStepType[] = [
    {
      stepName: {
        translationKey: "general",
        fallbackText: "General",
      },
      stepComponent: <ProductGeneralDetails values={{}} />,
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
      stepComponent: <NewProductDiscountOptions onChange={() => { }} />,
      key: "special discount",
    },
  ];

  const { t } = useTranslation();

  return (
    <div className="flex gap-4 h-full w-full flex-col justify-between">
      <StepperFormController
        lock={false}
        onFormComplete={(data) => {
          onSubmit && onSubmit(data);
        }}
        stepsNum={steps.length}
      >
        {({ currentStepIdx, goToStep, nextStep, values }) => (
          <>
            <CheckMarkStepper
              currentStepIdx={currentStepIdx}
              onStepChange={(step) => goToStep(step)}
              steps={mapArray(steps, ({ key, stepComponent, stepName }) =>
                key === "shipping" && values["product_type"] === "downloadable"
                  ? {
                    key: "files",
                    stepComponent: (
                      <StepperFormHandler handlerKey="files">
                        {({ validate }) => (
                          <AddNewDigitalProductSection onChange={validate} />
                        )}
                      </StepperFormHandler>
                    ),
                    stepName: "Files",
                  }
                  : {
                    key,
                    stepName,
                    stepComponent: (
                      <StepperFormHandler handlerKey={String(key)}>
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
                  nextStep();
                }}
              >
                {t("save and continue", "Save and continue")}
              </Button>
            </div>
          </>
        )}
      </StepperFormController>
    </div>
  );
});
