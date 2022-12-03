import { HealthCenterPractitioner } from "api";
import React from "react";
import { Avatar, HighlightText } from "ui";

export interface SearchHealthPractitionerCardProps {
  searchQuery: string;
  practitioner: HealthCenterPractitioner;
}

export const SearchHealthPractitionerCard: React.FC<
  SearchHealthPractitionerCardProps
> = ({ practitioner, searchQuery }) => {
  return (
    <div className="flex cursor-pointer gap-2 p-2 hover:bg-primary-50">
      <Avatar src={practitioner.photo} />
      <div className="flex flex-col gap-1">
        <div className="font-bold">
          <HighlightText text={practitioner.name} toHighlight={searchQuery} />
        </div>
        <span className="flex">
          {practitioner.specialty}, {practitioner.location.city}
        </span>
      </div>
    </div>
  );
};
