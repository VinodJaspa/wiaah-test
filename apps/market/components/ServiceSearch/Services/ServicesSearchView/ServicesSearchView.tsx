import React from "react";
import {
  filtersTokens,
  LocationSearchInput,
  ServicesSearchList,
  useMutateSearchFilters,
} from "ui";

export const ServicesSearchView: React.FC = () => {
  const { addFilter } = useMutateSearchFilters();
  return (
    <div className="py-8 flex items-center flex-col gap-8">
      <LocationSearchInput
        onLocationSelect={(loc) => addFilter([filtersTokens.location, loc])}
      />
      <ServicesSearchList />
    </div>
  );
};
