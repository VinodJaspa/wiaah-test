import React from "react";
import {
  filtersTokens,
  LocationSearchInput,
  useSearchFilters,
  ServicesSearchList,
} from "ui";

export const ServicesSearchView: React.FC = () => {
  const { addFilter } = useSearchFilters();
  return (
    <div className="py-8 flex items-center flex-col gap-8">
      <LocationSearchInput
        onLocationSelect={(loc) => addFilter([filtersTokens.location, loc])}
      />
      <ServicesSearchList />
    </div>
  );
};
