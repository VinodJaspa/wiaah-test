import { HealthCenterSpecialty } from "api";
import React from "react";
import { HighlightText, Avatar } from "@UI";

export interface SearchSpecialtiesCardProps {
  searchQuery: string;
  specialty: HealthCenterSpecialty;
}

export const SearchHealthSpecialtyCard: React.FC<
  SearchSpecialtiesCardProps
> = ({ searchQuery, specialty }) => {
  return (
    <div className="p-2 font-bold cursor-pointer hover:bg-primary-50 items-center flex gap-2">
      <HighlightText text={specialty.name} toHighlight={searchQuery} />
    </div>
  );
};
