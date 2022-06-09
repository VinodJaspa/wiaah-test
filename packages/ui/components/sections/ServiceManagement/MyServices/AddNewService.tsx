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
} from "ui";
import { NewServiceSchemas } from "validation";
import { CallbackAfter } from "utils";
import { ServiceGeneralDetails } from "./ServiceGeneralDetails";
import { IncludedServices } from "./IncludedServices";

export interface AddNewServiceProps {}

export const AddNewService: React.FC<AddNewServiceProps> = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("add_new_service", "Add New Service")} />
      <StepperFormController stepsNum={3} onFormComplete={() => {}}>
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
                            CallbackAfter(50, () => {
                              nextStep();
                            });
                          }}
                        />
                      )}
                    </StepperFormHandler>
                  ),
                  stepName: {
                    translationKey: "Service Type",
                    fallbackText: "Service Type",
                  },
                },
                {
                  key: "generalDetails",
                  stepComponent: (
                    <StepperFormHandler
                      validationSchema={
                        NewServiceSchemas.serviceGeneralDetailsSchema
                      }
                      handlerKey="generalDetails"
                    >
                      {({ validate }) => (
                        <ServiceGeneralDetails onChange={validate} />
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
                  stepComponent: <IncludedServices />,
                  stepName: {
                    translationKey: "Included Service",
                    fallbackText: "Included Service",
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

const serviceTypes: ServiceSelectingInfo[] = [
  {
    serviceIcon: GiHouse,
    serviceKey: "placeBooking",
    serviceDescription: {
      translationKey: "place_booking_service_selecting_description",
      fallbackText: "put some place up for rent",
    },
    serviceName: {
      translationKey: "place_book",
      fallbackText: "Place Book",
    },
  },
  {
    serviceIcon: GiTalk,
    serviceKey: "rendez-vous",
    serviceDescription: {
      translationKey: "book_appointment_service_selecting_description",
      fallbackText:
        "offer your experince as an appointment to talk and discuss",
    },
    serviceName: {
      translationKey: "rendez-vous",
      fallbackText: "rendez-vous",
    },
  },
  {
    serviceIcon: FaMotorcycle,
    serviceKey: "thingsRenting",
    serviceDescription: {
      translationKey: "things_renting_service_selecting_description",
      fallbackText: "put some of your unused things or tools for rent",
    },
    serviceName: {
      translationKey: "things_renting",
      fallbackText: "Things renting",
    },
  },
];

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
      <h1 className="text-xl font-bold">
        {t("select_your_type_of_service", "Select your type of service")}
      </h1>

      <div className="grid grid-cols-3">
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
