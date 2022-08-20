import { ServiceType } from "dto";
import React from "react";
import { useTranslation } from "react-i18next";
import { GiHouse, GiTalk } from "react-icons/gi";
import { FaMotorcycle } from "react-icons/fa";
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
} from "ui";
import { NewServiceSchemas } from "validation";
import { CallbackAfter, runIfFn } from "utils";
import { ServiceGeneralDetails } from "./ServiceGeneralDetails";
import { IncludedServices } from "./IncludedServices";
import { ExtraServiceOptions } from "./ExtraServiceOptions";
import { RestaurantServiceDetailsForm } from "./RestaurantServiceDetailsForm";
import { AnySchema } from "yup";

export interface AddNewServiceProps {}

export const AddNewService: React.FC<AddNewServiceProps> = () => {
  const { t } = useTranslation();
  const [serviceType, setServiceType] = React.useState<ServiceType>();

  const serviceTypes: ServiceSelectingInfo[] = [
    {
      serviceIcon: GiHouse,
      serviceKey: "placeBooking",
      serviceDescription: "put some place up for rent",
      serviceName: "Place Book",
    },
    {
      serviceIcon: GiTalk,
      serviceKey: "rendez-vous",
      serviceDescription:
        "offer your experince as an appointment to talk and discuss",
      serviceName: "rendez-vous",
    },
    {
      serviceIcon: FaMotorcycle,
      serviceKey: "thingsRenting",
      serviceDescription: "put some of your unused things or tools for rent",
      serviceName: "Things renting",
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

  const ServicesDetailsSections: {
    key: ServiceType;
    component: React.FC<any>;
    schema: AnySchema;
  }[] = [
    {
      key: "restaurant",
      component: RestaurantServiceDetailsForm,
      schema: NewServiceSchemas.serviceGeneralDetailsSchema,
    },
  ];

  const detailsSection = ServicesDetailsSections.find(
    (section) => section.key === serviceType
  );

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("Add New Service")} />
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
                      validationSchema={
                        detailsSection ? detailsSection.schema : undefined
                      }
                      handlerKey="generalDetails"
                    >
                      {({ validate }) => (
                        <>
                          {detailsSection ? (
                            <detailsSection.component onChange={validate} />
                          ) : null}
                        </>
                      )}
                    </StepperFormHandler>
                  ),
                  stepName: {
                    translationKey: "Service general details",
                    fallbackText: "Service general details",
                  },
                },
                {
                  key: "includedServices",
                  stepComponent: (
                    <StepperFormHandler
                      handlerKey="includedServices"
                      validationSchema={NewServiceSchemas.includedServices}
                    >
                      <IncludedServices onChange={() => {}} />
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
            {currentStepIdx !== 0 && (
              <Button className="w-fit self-end" onClick={() => nextStep()}>
                {t("Next")}
              </Button>
            )}
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
