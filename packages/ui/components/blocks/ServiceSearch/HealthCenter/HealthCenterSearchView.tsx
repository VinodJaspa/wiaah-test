import {
  PractitionersSearchResultsList,
  HealthCenterSearchBox,
} from "../../../features";
import React from "react";

export const HealthCenterSearchView: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 ">
      <HealthCenterSearchBox />
      <PractitionersSearchResultsList />
    </div>
  );
};
