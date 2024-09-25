import React from "react";
import { useTranslation } from "react-i18next";
import { ProductCondition, StepperStepType } from "types";
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
import * as Yup from "yup";
import { ProductType } from "@features/API";

export interface AddNewProductSectionProps { }

const addProductLanguagesSection = [
  {
    language: {
      name: "English",
      countryCode: "GB",
      languageCode: "en",
    },
  },
  {
    language: {
      name: "French",
      countryCode: "FR",
      languageCode: "fr",
    },
  },
  {
    language: {
      name: "German",
      countryCode: "DE",
      languageCode: "de",
    },
  },
  {
    language: {
      name: "Spanish",
      countryCode: "ES",
      languageCode: "es",
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
        const currLang =
          addProductLanguagesSection[index].language.languageCode;
        setLang(currLang);
      },
      [setLang]
    );

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
              console.log(
                "DATE ==>  " +
                JSON.stringify({
                  ...data,
                  name: { langId: lang, value: data.title },

                  description: { langId: lang, value: data.description },
                })
              );
              mutate({
                ...data,
                title: { langId: lang, value: data.title },
                description: { langId: lang, value: data.description },
              });
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
  const steps: (StepperStepType & { validationSchema?: Yup.AnySchema })[] = [
    {
      stepName: {
        translationKey: "general",
        fallbackText: "General",
      },
      validationSchema: Yup.object({
        title: Yup.string()
          .required("Title is required")
          .max(100, "Max 100 characters"),
        description: Yup.string().required("Description is required"),
        metaTagDescription: Yup.string().max(150, "Max 150 characters"),
        metaTagKeyword: Yup.string().max(100, "Max 100 characters"),
        productTag: Yup.string().max(50, "Max 50 characters"),
        external_url: Yup.string().url("Must be a valid URL"),
        condition: Yup.mixed().oneOf(
          Object.values(ProductCondition),
          "Invalid condition"
        ),
        type: Yup.mixed().oneOf(
          Object.values(ProductType),
          "Invalid product type"
        ),
        price: Yup.number()
          .required("Price is required")
          .min(1, "Price must be at least 1"),
        vat: Yup.number()
          .required("VAT is required")
          .min(0, "VAT must be at least 0"),
        categoryId: Yup.string().required("Category is required"),
        qty: Yup.number()
          .required("Quantity is required")
          .min(1, "Quantity must be at least 1"),
        hashtags: Yup.array().of(
          Yup.string().max(50, "Max 50 characters per hashtag")
        ),
      }),
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
        {({ currentStepIdx, goToStep, nextStep, values, validate }) => (
          <>
            <CheckMarkStepper
              currentStepIdx={currentStepIdx}
              onStepChange={(step) => goToStep(step)}
              steps={mapArray(
                steps,
                ({ key, stepComponent, stepName, validationSchema }) =>
                  key === "shipping" &&
                    values["product_type"] === "downloadable"
                    ? {
                      key: "files",
                      stepComponent: (
                        <StepperFormHandler
                          handlerKey="files"
                          validationSchema={validationSchema}
                        >
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
                      stepComponent: (
                        <StepperFormHandler
                          handlerKey={String(key)}
                          validationSchema={validationSchema}
                        >
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
