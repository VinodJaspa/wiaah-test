import { HealthCenterPractitioner } from "api";
import React from "react";
import { ServiceCardPresentation, ServicesRequestKeys } from "ui";
import { setTestid } from "utils";

export interface PractitionerSearchResultsCardProps {
  practitioner: HealthCenterPractitioner;
  children?: string;
}

export const PractitionerSearchResultsCard: React.FC<
  PractitionerSearchResultsCardProps
> = ({ practitioner }) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded overflow-hidden">
      <ServiceCardPresentation
        src={practitioner.photo}
        alt={practitioner.name}
        data={practitioner}
        serviceKey={ServicesRequestKeys.healthCenter}
      />
      <div {...setTestid("ServiceInfoSection")} className="flex flex-col gap-4">
        <div className="flex flex-col font-semibold">
          <div className="text-primary">{practitioner.name}</div>
          <span>{practitioner.specialty}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span>{practitioner.location.address}</span>
          <span>
            {practitioner.location.postalCode} {practitioner.location.city}
          </span>
        </div>
      </div>
    </div>
  );
};
