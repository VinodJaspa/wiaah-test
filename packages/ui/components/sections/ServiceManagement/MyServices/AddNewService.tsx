import { ServiceType } from "dto";
import React from "react";
import { useTranslation } from "react-i18next";
import { GiHouse } from "react-icons/gi";
import { FaHotel } from "react-icons/fa";
import {
  SectionHeader,
  CheckMarkStepper,
  StepperFormController,
  StepperFormHandler,
  ServiceSelectingInfo,
  ServiceTypeCard,
  Button,
  NewProductDiscountOptions,
  ForkAndSpoonIcon,
  CarWheelIcon,
  HealthIcon,
  BeautyCenterIcon,
  Tabs,
  TabList,
  TabsHeader,
  TabItem,
  TabTitle,
  FlagIcon,
  MyServicesCtx,
} from "ui";
import { NewServiceSchemas } from "validation";
import { CallbackAfter } from "utils";
import { ServiceGeneralDetails } from "./ServiceGeneralDetails";
import { IncludedServices } from "./IncludedServices";
import { ExtraServiceOptions } from "./ExtraServiceOptions";
import { RestaurantServiceDetailsForm } from "./RestaurantServiceDetailsForm";
import { AnySchema } from "yup";
import { HealthCenterServiceDetailsForm } from "./HealthCenterServiceDetailsForm";
import { VehicleServiceDetailsForm } from "./VehicleServiceDetailsForm";
import { BeautyCenterServiceDetailsForm } from "./BeautyCenterServiceDetailsForm";
import { ServicePoliciesSection } from "./ServicePoliciesSection";
import { RestaurantIncludedServicesSection } from "./RestaruantIncludedServicesSection";
import { HolidayRentalsGeneralDetailsForm } from "./HolidayRentalsGeneralDetailsForm";
import { HealthCenterIncludedServices } from "./HealthCenterIncludedServices";

export interface AddNewServiceProps {}

export const AddNewService: React.FC<AddNewServiceProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <SectionHeader sectionTitle={t("Add New Service")} />

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
              <TabItem key={i}>{null}</TabItem>
            </React.Fragment>
          ))}
          <TabList />
        </>
      </Tabs>
      {addProductLanguagesSection[0].section({})}
    </div>
  );
};

type ServiceSectionWithSchemaType = {
  key: ServiceType;
  component: React.FC<any>;
  schema: AnySchema;
};

export const NewServiceStepper: React.FC = () => {
  const { t } = useTranslation();
  const [serviceType, setServiceType] = React.useState<ServiceType>();
  const { CancelAddingNewService } = React.useContext(MyServicesCtx);

  const serviceTypes: ServiceSelectingInfo[] = [
    {
      serviceIcon: FaHotel,
      serviceKey: "hotel",
      serviceDescription: "Put up your hotel for booking",
      serviceName: "Hotel booking",
    },
    {
      serviceIcon: GiHouse,
      serviceKey: "holidayRentals",
      serviceDescription: "put some place up for rent",
      serviceName: "Holiday rentals",
    },
    {
      serviceIcon: ForkAndSpoonIcon,
      serviceKey: "restaurant",
      serviceDescription:
        "offer your special dishes for food lovers all over the world!",
      serviceName: "Restaruant",
    },
    {
      serviceIcon: HealthIcon,
      serviceKey: "healthCenter",
      serviceDescription: "offer your experts experience in health medical!",
      serviceName: "Health Center",
    },
    {
      serviceIcon: CarWheelIcon,
      serviceKey: "Vehicle",
      serviceDescription: "offer your vehicle for rent to whoever needs!",
      serviceName: "Vehicle renting",
    },
    {
      serviceIcon: BeautyCenterIcon,
      serviceKey: "beautyCenter",
      serviceDescription: "offer beauty methods that you only know!",
      serviceName: "Beauty Center",
    },
  ];

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
      key: "Vehicle",
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
      key: "placeBooking",
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
      schema: NewServiceSchemas.healthCenterIncludedServicesSchema,
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
        stepsNum={5}
        onFormComplete={() => {}}
      >
        {({ nextStep, currentStepIdx, goToStep }) => (
          <>
            <CheckMarkStepper
              currentStepIdx={currentStepIdx}
              onStepChange={(step) => goToStep(step)}
              steps={[
                {
                  key: "selectServiceType",
                  stepComponent: (
                    <StepperFormHandler
                      validationSchema={NewServiceSchemas.serviceTypeSchema}
                      handlerKey="serviceType"
                    >
                      {({ validate }) => (
                        <ChooseServiceType
                          ServicesInfo={serviceTypes}
                          onServiceChoosen={(key) => {
                            validate({ type: key });

                            setServiceType(key);
                            CallbackAfter(50, () => {
                              nextStep();
                            });
                          }}
                        />
                      )}
                    </StepperFormHandler>
                  ),
                  stepName: "Service Type",
                },
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
                  key: "servicePolicies",
                  stepComponent: (
                    <StepperFormHandler handlerKey="servicePolicies">
                      {({ validate }) => (
                        <>
                          <ServicePoliciesSection onChange={validate} />
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
                      {includedServiceSection ? (
                        <includedServiceSection.component />
                      ) : null}
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
                      <ExtraServiceOptions onChange={() => {}} />
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
                      <NewProductDiscountOptions />
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

              {currentStepIdx !== 0 && (
                <Button className="w-fit self-end" onClick={() => nextStep()}>
                  {t("Next")}
                </Button>
              )}
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

const addProductLanguagesSection: {
  language: {
    name: string;
    countryCode: string;
  };
  section: React.FunctionComponent;
}[] = [
  {
    language: {
      name: "English",
      countryCode: "GB",
    },
    section: NewServiceStepper,
  },
  {
    language: {
      name: "French",
      countryCode: "FR",
    },
    section: NewServiceStepper,
  },
  {
    language: {
      name: "German",
      countryCode: "DE",
    },
    section: NewServiceStepper,
  },
  {
    language: {
      name: "Spanish",
      countryCode: "ES",
    },
    section: NewServiceStepper,
  },
];
