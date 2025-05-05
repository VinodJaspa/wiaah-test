import { HealthCenterPractitioner } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { SearchHealthPractitionerCard } from "../../Cards";

export interface SearchHealthPractitionersCardsListProps {
  searchQuery: string;
  practitioners: HealthCenterPractitioner[];
}

export const SearchHealthPractitionersCardsList: React.FC<
  SearchHealthPractitionersCardsListProps
> = ({ practitioners, searchQuery }) => {
const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full">
      <p className="font-bold text-lg p-2">{t("PRACTITONERS")}</p>
      <div className="flex flex-col gap-2">
        {Array.isArray(practitioners)
          ? practitioners.map((prac, i) => (
              <SearchHealthPractitionerCard
                practitioner={prac}
                key={i}
                searchQuery={searchQuery}
              />
            ))
          : null}
      </div>
    </div>
  );
};
