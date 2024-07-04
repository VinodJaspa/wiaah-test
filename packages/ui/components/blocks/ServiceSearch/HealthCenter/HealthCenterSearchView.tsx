import React from "react";
import { HealthCenterSearchBox, PractitionersSearchResultsList } from "@UI";

export const HealthCenterSearchView: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 ">
      <HealthCenterSearchBox />
      <PractitionersSearchResultsList />
    </div>
  );
};
