import { ServiceLocation, ServiceLocationType } from "api";
import React from "react";
import { HtmlDivProps } from "types";

export type LocationAddressDisplayProps = ServiceLocationType & HtmlDivProps;

export const LocationAddressDisplay: React.FC<LocationAddressDisplayProps> = ({
  address,
  city,
  cords,
  country,
  countryCode,
  postalCode,
  state,
  ...props
}) => {
  return (
    <p {...props}>
      {address} {postalCode}, {city}, {country}
    </p>
  );
};
