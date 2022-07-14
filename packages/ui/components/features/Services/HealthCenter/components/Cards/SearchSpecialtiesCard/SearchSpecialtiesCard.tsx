import { HealthCenterSpecialty } from "api";
import React from "react";
import { HighlightText, Avatar } from "ui";

export interface SearchSpecialtiesCardProps {
  searchQuery: string;
  specialty: HealthCenterSpecialty;
}

export const SearchHealthSpecialtyCard: React.FC<
  SearchSpecialtiesCardProps
> = ({ searchQuery, specialty }) => {
  return (
    <div className="p-2 font-bold cursor-pointer hover:bg-primary-50 items-center flex gap-2">
      {typeof specialty.photo === "string" ? (
        <Avatar src={specialty.photo} alt={specialty.title} />
      ) : null}
      <HighlightText text={specialty.title} toHighlight={searchQuery} />
    </div>
  );
};
