import { HealthCenterSpecialty } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { SearchHealthSpecialtyCard } from "../../Cards";

export const SearchHealthSpecialtiesCardsList: React.FC<{
  specialites: HealthCenterSpecialty[];
  searchQuery: string;
}> = ({ specialites, searchQuery }) => {
const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full">
      <p className="font-bold text-lg p-2">{t("HEALTH CENTER")}</p>
      {Array.isArray(specialites)
        ? specialites.map((speciality, i) => (
            <SearchHealthSpecialtyCard
              key={i}
              searchQuery={searchQuery}
              specialty={speciality}
            />
          ))
        : null}
    </div>
  );
};
