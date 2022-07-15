import { HealthCenterFilteredData, HealthCenterPractitioner } from "api";
import React from "react";
import { AspectRatio, HighlightText } from "ui";

export interface PractitionerSearchResultsCardProps {
  practitioner: HealthCenterFilteredData;
  children?: string;
}

export const PractitionerSearchResultsCard: React.FC<
  PractitionerSearchResultsCardProps
> = ({ practitioner }) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded overflow-hidden">
      <AspectRatio ratio={1}>
        <img
          className="w-full h-full object-cover"
          src={practitioner.photo}
          alt={practitioner.name}
        />
      </AspectRatio>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col font-semibold">
          <div>
            <HighlightText toHighlight={practitioner.name}>
              {practitioner.name}
            </HighlightText>
          </div>
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
