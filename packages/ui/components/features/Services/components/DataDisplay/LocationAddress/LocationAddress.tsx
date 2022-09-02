import { ServiceLocation, ServiceLocationType } from "api";
import React from "react";

export interface LocationAddressDisplayProps extends ServiceLocationType {}

export const LocationAddressDisplay: React.FC<LocationAddressDisplayProps> = (
  props
) => {
  return (
    <p>
      {props.address} {props.postalCode}, {props.city}, {props.country}
    </p>
  );
};
