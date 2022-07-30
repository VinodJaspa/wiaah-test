import React from "react";
import { useRouting } from "routing";
import {
  RecommendedBeautyCenterSearchList,
  LocationSearchInput,
  ServicesRequestKeys,
} from "ui";

export const BeautyCenterSearchView: React.FC = () => {
  const { visit } = useRouting();
  return (
    <div className="flex flex-col items-center gap-8">
      <LocationSearchInput
        onLocationSelect={(location) => {
          visit((routes) =>
            routes.visitServiceLocationSearchResults(
              ServicesRequestKeys.beauty_center,
              location
            )
          );
        }}
      />

      <RecommendedBeautyCenterSearchList />
    </div>
  );
};
