// import { VehiclePickupLocation } from "api";
import React from "react";
import { VehiclePickupLocation } from "api";

export interface PickupLocationSuggistionCardProps
  extends VehiclePickupLocation {}

export const PickupLocationSuggistionCard: React.FC<
  PickupLocationSuggistionCardProps
> = ({ address, city }) => {
  return (
    <div className="flex flex-col p-2">
      <p className="font-bold">{address}</p>
      <p className="text-gray-400">{city}</p>
    </div>
  );
};
