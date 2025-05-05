import { ServiceLocation } from "@features/API";
import React from "react";

export const LocationAddress: React.FC<{
  location: ServiceLocation;
  isAction?: boolean;
}> = ({ location, isAction }) => {
  return !isAction ? (
    <p>
      {location.address} {location.postalCode}, {location.city},{" "}
      {location.country}
    </p>
  ) : (
    <p>
      {location.city}, {location.country.charAt(0)}
    </p>
  );
};
