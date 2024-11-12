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
  FormTranslationWrapper,
  useCreateNewProductMutation,
  useEditProductData,
  FlagIcon,
} from "@UI";
import { ProductGeneralDetails } from "@blocks";
import * as Yup from "yup";
import { ProductType } from "@features/API";

export interface AddNewProductSectionProps { }
const shippingValidationSchema = Yup.object().shape({
  shippingMethods: Yup.array().of(Yup.string()).min(1, "select_at_least_one"),
});

const optionsValidationScheam = Yup.object().shape({
  colors: Yup.array()
    .of(Yup.string())
    .min(1, "select_at_least_one_color")
    .required("colors_required"),
  sizes: Yup.array()
    .of(Yup.string())
    .min(1, "select_at_least_one_size")
    .required("sizes_required"),
});
const detailedValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(4, "Min 4 characters")
    .max(100, "Max 100 characters"),
  description: Yup.string().required("Description is required"),
  // brand: Yup.string().required("Description is required"),
  metaTagDescription: Yup.string().max(150, "Max 150 characters"),
  metaTagKeyword: Yup.string().max(100, "Max 100 characters"),
  // external_url: Yup.string().url("Must be a valid URL"),
  price: Yup.number()
    .required("Price is required")
    .min(1, "Price must be at least 1"),
  vat: Yup.number()
    .required("VAT is required")
    .min(0, "VAT must be at least 0"),
  quantity: Yup.number()
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1"),
  type: Yup.mixed<ProductType>()
    .oneOf(Object.values(ProductType), "Invalid product type")
    .required("Product type is required"),
});
const discountValidationSchema = Yup.object().shape({
  percentOff: Yup.number().required("Percent off is required"),
  units: Yup.number()
    .required("Units are required")
    .positive("Units must be a positive number")
    .integer("Units must be an integer"),
  startDate: Yup.string().required("Start Date is required"),
  endDate: Yup.string().required("Start Date is required"),
});

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
      [setLang],
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
                "DATA ==>  " +
                JSON.stringify({
                  ...data,
                  title: { langId: lang, value: data.title },
                  description: { langId: lang, value: data.description },
                }),
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
  const { t } = useTranslation();

  return (
    <div className="flex gap-4 h-full w-full flex-col justify-between">
      <StepperFormController
        onFormComplete={(data) => {
          onSubmit && onSubmit(data);
        }}
        stepsNum={4}
      >
        {({ currentStepIdx, goToStep, nextStep, previousStep }) => (
          <>
            <CheckMarkStepper
              currentStepIdx={currentStepIdx}
              onStepChange={goToStep}
              steps={[
                {
                  stepName: {
                    translationKey: "general",
                    fallbackText: "General",
                  },
                  stepComponent: (
                    <StepperFormHandler
                      handlerKey="general"
                      validationSchema={detailedValidationSchema}
                    >
                      {({ validate }) => (
                        <ProductGeneralDetails
                          validationSchema={detailedValidationSchema}
                          onChange={validate}
                          values={{}}
                        />
                      )}
                    </StepperFormHandler>
                  ),
                  key: "general",
                },
                {
                  stepName: {
                    translationKey: "shipping",
                    fallbackText: "Shipping",
                  },
                  stepComponent: (
                    <StepperFormHandler
                      handlerKey="shipping"
                      validationSchema={shippingValidationSchema}
                    >
                      {({ validate }) => (
                        <NewProductShippingOptions
                          onValid={validate}
                          validationSchema={shippingValidationSchema}
                        />
                      )}
                    </StepperFormHandler>
                  ),
                  key: "shipping",
                },
                {
                  stepName: {
                    translationKey: "options",
                    fallbackText: "Options",
                  },
                  stepComponent: (
                    <StepperFormHandler
                      handlerKey="options"
                      validationSchema={optionsValidationScheam}
                    >
                      {({ validate }) => (
                        <ProductOptions
                          onValid={validate}
                          validationSchema={optionsValidationScheam}
                        />
                      )}
                    </StepperFormHandler>
                  ),
                  key: "options",
                },
                {
                  stepName: {
                    translationKey: "special_discount",
                    fallbackText: "Special Discount",
                  },
                  stepComponent: (
                    <StepperFormHandler
                      handlerKey="discount"
                      validationSchema={discountValidationSchema}
                    >
                      {({ validate }) => (
                        <NewProductDiscountOptions
                          onChange={validate}
                          validationSchema={discountValidationSchema}
                        />
                      )}
                    </StepperFormHandler>
                  ),
                  key: "special discount",
                },
              ]}
            />
            <div className="w-full flex justify-end gap-4">
              <Button
                onClick={() => previousStep()}
                className="bg-gray-100 hover:bg-gray-300 active:bg-gray-400 text-black"
              >
                {t("preview", "preview")}
              </Button>
              <Button onClick={() => nextStep()}>
                {t("save and continue", "Save and continue")}
              </Button>
            </div>
          </>
        )}
      </StepperFormController>
    </div>
  );
});
