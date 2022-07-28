import React from "react";
import { RecommendedBeautyCenterSearchList, LocationSearchInput } from "ui";

export const BeautyCenterSearchView: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <LocationSearchInput onLocationSelect={() => {}} />

      <RecommendedBeautyCenterSearchList />
    </div>
  );
};
