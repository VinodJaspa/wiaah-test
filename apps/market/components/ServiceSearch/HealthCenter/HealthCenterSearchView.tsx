import React from "react";
import {
  HealthCenterSearchBox,
  HealthCenterServiceSearchResultsList,
} from "ui";

export const HealthCenterSearchView: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 py-8">
      <HealthCenterSearchBox />
      <HealthCenterServiceSearchResultsList />
    </div>
  );
};
