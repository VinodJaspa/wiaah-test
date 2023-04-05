import { ServiceType } from "dto";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  StepperFormController,
  StepperFormHandler,
  Button,
  FlagIcon,
  SimpleTabs,
  SimpleTabHead,
  SimpleTabItemList,
  FormTranslationWrapper,
} from "@partials";
import {
  CheckMarkStepper,
  ServiceSelectingInfo,
  ServiceTypeCard,
} from "@blocks";
import { MyServicesCtx } from "./index";
import { ServicePoliciesInputSection } from "./ServicePoliciesSection";
import { NewProductDiscountOptions } from "@sections/ShopManagement";
import { SectionHeader } from "@sections";
import { DiscoverOurServiceForm } from "./DiscoverOurServiceForm";
import { NewServiceSchemas } from "validation";
import { WiaahLanguageCountries } from "utils";
import { ServiceGeneralDetails } from "./ServiceGeneralDetails";
import { IncludedServices } from "./IncludedServices";
import { ExtraServiceOptions } from "./ExtraServiceOptions";
import { RestaurantServiceDetailsForm } from "./RestaurantServiceDetailsForm";
import { HealthCenterServiceDetailsForm } from "./HealthCenterServiceDetailsForm";
import { VehicleServiceDetailsForm } from "./VehicleServiceDetailsForm";
import { BeautyCenterServiceDetailsForm } from "./BeautyCenterServiceDetailsForm";
import { RestaurantIncludedServicesSection } from "./RestaruantIncludedServicesSection";
import { HolidayRentalsGeneralDetailsForm } from "./HolidayRentalsGeneralDetailsForm";
import { HealthCenterIncludedServices } from "./HealthCenterIncludedServices";
import { AnySchema } from "yup";
import { useCreateServiceMutation } from "@features/Services/Services/mutation";

export interface AddNewServiceProps {}
export const AddNewService: React.FC<AddNewServiceProps> = ({ children }) => {
  const {
    AddNewService,
    CancelAddingNewService,
    EditService,
    ServiceIdFormState,
  } = useContext(MyServicesCtx);
  const { t } = useTranslation();
  const [lang, setLang] = React.useState<string>("en");
  const { mutate } = useCreateServiceMutation();
  const [data, setData] = React.useState<Record<string, any>>({});

  const isEdit = typeof ServiceIdFormState === "string";

  return (
    <div className="flex gap-4 flex-col h-full">
      <SectionHeader
        sectionTitle={isEdit ? t("Edit Service") : t("Add New Service")}
      />

      <SimpleTabs>
        <>
          <div className="flex-wrap flex gap-4 flex-col sm:flex-row justify-center sm:justify-start">
            <SimpleTabHead>
              {WiaahLanguageCountries.map(
                ({ code, name }, i) =>
                  ({ selected, onClick }: any) =>
                    (
                      <div
                        onClick={onClick}
                        className={`${
                          selected === i ? "border-primary" : "border-gray-300"
                        } flex cursor-pointer w-fit items-center gap-2 border-b-[1px] shadow p-2`}
                      >
                        <FlagIcon code={code} />
                        <span className="hidden sm:block">{name}</span>
                      </div>
                    )
              )}
            </SimpleTabHead>
          </div>
          <SimpleTabItemList />
        </>
      </SimpleTabs>
      <FormTranslationWrapper lang={lang} onLangChange={setLang}>
        <NewServiceStepper
          onSubmit={(data) => mutate(data)}
          isEdit={isEdit || false}
          data={data}
          serviceType={"vehicle"}
        />
      </FormTranslationWrapper>
    </div>
  );
};

export type ServiceSectionWithSchemaType = {
  key: ServiceType;
  component: React.FC<any>;
  schema: AnySchema;
};

export const NewServiceStepper: React.FC<{
  isEdit: boolean;
  data?: any;
  onSubmit?: (data: any) => any;
  serviceType: ServiceType;
}> = ({ isEdit, data, onSubmit, serviceType: type }) => {
  const { t } = useTranslation();
  const [serviceType, setServiceType] = React.useState<ServiceType>(type);
  const { CancelAddingNewService } = React.useContext(MyServicesCtx);

  const ServicesDetailsSections: ServiceSectionWithSchemaType[] = [
    {
      key: "restaurant",
      component: RestaurantServiceDetailsForm,
      schema: NewServiceSchemas.restaurantDetailsSchema,
    },
    {
      key: "hotel",
      component: ServiceGeneralDetails,
      schema: NewServiceSchemas.serviceGeneralDetailsSchema,
    },
    {
      key: "healthCenter",
      component: HealthCenterServiceDetailsForm,
      schema: NewServiceSchemas.healthCenterDetailsSchema,
    },
    {
      key: "vehicle",
      component: VehicleServiceDetailsForm,
      schema: NewServiceSchemas.vehicleDetailsSchema,
    },
    {
      key: "beautyCenter",
      component: BeautyCenterServiceDetailsForm,
      schema: NewServiceSchemas.beautyCenterDetailsSchema,
    },
    {
      key: "holidayRentals",
      component: HolidayRentalsGeneralDetailsForm,
      schema: NewServiceSchemas.beautyCenterDetailsSchema,
    },
  ];

  const includedServiceSections: ServiceSectionWithSchemaType[] = [
    {
      key: "hotel",
      component: IncludedServices,
      schema: NewServiceSchemas.hotelIncludedServicesSchema,
    },
    {
      key: "restaurant",
      component: RestaurantIncludedServicesSection,
      schema: NewServiceSchemas.RestaurantIncludedServicesSchema,
    },
    {
      key: "holidayRentals",
      component: IncludedServices,
      schema: NewServiceSchemas.RestaurantIncludedServicesSchema,
    },
    {
      key: "healthCenter",
      component: HealthCenterIncludedServices,
      schema: NewServiceSchemas.HealthcenterIncludedServicesSchema,
    },
  ];

  const includedServiceSection = includedServiceSections.find(
    (s) => s.key === serviceType
  );

  const detailsSection = ServicesDetailsSections.find(
    (section) => section.key === serviceType
  );

  return (
    <div className="flex flex-col gap-4 h-full justify-between">
      <StepperFormController
        lock={false}
        stepsNum={7}
        onFormComplete={(data) => onSubmit && onSubmit(data)}
      >
        {({ nextStep, currentStepIdx, goToStep }) => (
          <>
            <CheckMarkStepper
              currentStepIdx={currentStepIdx}
              onStepChange={(step) => goToStep(step)}
              steps={[
                {
                  key: "generalDetails",
                  stepComponent: (
                    <StepperFormHandler
                      validationSchema={detailsSection?.schema}
                      handlerKey="generalDetails"
                    >
                      {({ validate }) => {
                        return (
                          <>
                            {detailsSection ? (
                              <detailsSection.component onChange={validate} />
                            ) : null}
                          </>
                        );
                      }}
                    </StepperFormHandler>
                  ),
                  stepName: {
                    translationKey: "Service general details",
                    fallbackText: "Service general details",
                  },
                },
                {
                  key: "Discover our service",
                  stepComponent: (
                    <StepperFormHandler handlerKey="discoverOurService">
                      {({ validate }) => {
                        return (
                          <>
                            {detailsSection ? (
                              <DiscoverOurServiceForm
                                onChange={validate}
                                serviceLabel={(() => {
                                  switch (serviceType) {
                                    case "hotel":
                                      return t("Hotel");
                                    case "restaurant":
                                      return t("Restaurant");
                                    case "healthCenter":
                                      return t("Health Center");
                                    case "beautyCenter":
                                      return t("Beauty Center");
                                    case "holidayRentals":
                                      return t("Holiday Rentals");
                                    case "vehicle":
                                      return t("Vehicles");
                                    default:
                                      return t("Service");
                                  }
                                })()}
                              />
                            ) : null}
                          </>
                        );
                      }}
                    </StepperFormHandler>
                  ),
                  stepName: {
                    translationKey: "discover_our_service",
                    fallbackText: "Discover Our Service",
                  },
                },
                {
                  key: "servicePolicies",
                  stepComponent: (
                    <StepperFormHandler handlerKey="servicePolicies">
                      {({ validate }) => (
                        <>
                          <ServicePoliciesInputSection onChange={validate} />
                        </>
                      )}
                    </StepperFormHandler>
                  ),
                  stepName: {
                    translationKey: "Service Policy Details",
                    fallbackText: "Service Policy Details",
                  },
                },
                {
                  key: "includedServices",
                  stepComponent: (
                    <StepperFormHandler
                      handlerKey="includedServices"
                      validationSchema={includedServiceSection?.schema}
                    >
                      {({ validate }) => (
                        <>
                          {includedServiceSection ? (
                            <includedServiceSection.component
                              onChange={validate}
                            />
                          ) : null}
                        </>
                      )}
                    </StepperFormHandler>
                  ),
                  stepName: {
                    translationKey: "Included Service",
                    fallbackText: "Included Service",
                  },
                },
                {
                  key: "extraServiceOptions",
                  stepComponent: (
                    <StepperFormHandler
                      handlerKey="extraServiceOptions"
                      validationSchema={NewServiceSchemas.extraSreivce}
                    >
                      {({ validate }) => (
                        <ExtraServiceOptions onChange={validate} />
                      )}
                    </StepperFormHandler>
                  ),
                  stepName: {
                    translationKey: "Extra Service",
                  },
                },
                {
                  key: "discount",
                  stepComponent: (
                    <StepperFormHandler
                      handlerKey="discount"
                      validationSchema={NewServiceSchemas.discount}
                    >
                      {({ validate }) => (
                        <NewProductDiscountOptions onChange={validate} />
                      )}
                    </StepperFormHandler>
                  ),
                  stepName: {
                    translationKey: "Discount",
                  },
                },
              ]}
            />
            <div className="w-full justify-between flex">
              <Button onClick={() => CancelAddingNewService()}>
                {t("Cancel")}
              </Button>

              <Button className="w-fit self-end" onClick={() => nextStep()}>
                {t("Next")}
              </Button>
            </div>
          </>
        )}
      </StepperFormController>
    </div>
  );
};

export interface ChooseServiceTypeProps {
  ServicesInfo: ServiceSelectingInfo[];
  onServiceChoosen: (serviceKey: ServiceType) => any;
}

export const ChooseServiceType: React.FC<ChooseServiceTypeProps> = ({
  ServicesInfo,
  onServiceChoosen,
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <h1 className="text-xl font-bold">{t("Select your type of service")}</h1>

      <div className="flex flex-wrap gap-4 justify-center">
        {ServicesInfo.map((service, i) => (
          <ServiceTypeCard
            onServiceChoosen={onServiceChoosen}
            serviceInfo={service}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
