import { HealthCenterPractitioner } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ServiceCardPresentation,
  ServicesRequestKeys,
  LocationAddress,
} from "@UI";
import { setTestid } from "utils";

export interface PractitionerSearchResultsCardProps {
  practitioner: HealthCenterPractitioner;
  children?: string;
}

export const PractitionerSearchResultsCard: React.FC<
  PractitionerSearchResultsCardProps
> = ({ practitioner }) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-2 rounded overflow-hidden">
      <ServiceCardPresentation
        src={practitioner.photo}
        alt={practitioner.name}
        data={practitioner}
        serviceKey={ServicesRequestKeys.healthCenter}
      />
      <div {...setTestid("ServiceInfoSection")} className="flex flex-col gap-2">
        <div className="flex flex-col font-semibold">
          <p className="font-semibold text-lg">{practitioner.name}</p>
          <span>{practitioner.specialty}</span>
        </div>
        <div className="flex font-semibold flex-col gap-1">
          <LocationAddress
            location={{
              state: practitioner.location.state!,
              country: practitioner.location.country,
              address: practitioner.location.address,
              city: practitioner.location.city,
              postalCode: practitioner.location.postalCode,
              lat: practitioner.location.lat,
              lon: practitioner.location.lon,
            }}
          />
        </div>
        <p className="font-bold">
          {t("Reviews")}: {practitioner.reviews}
        </p>
      </div>
    </div>
  );
};
