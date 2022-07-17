import React from "react";
import { VehicleSearchBox,VehicleSearchList } from "ui"

export const VehicleSearchView: React.FC = () => {
  return <div className="p-8 flex flex-col gap-8">
    <VehicleSearchBox />
    <VehicleSearchList />
  </div>;
};
