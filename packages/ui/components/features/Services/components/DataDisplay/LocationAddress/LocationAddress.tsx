import { ServiceLocation } from "@features/API";
import React from "react";

export const LocationAddress: React.FC<{
  location: ServiceLocation;
}> = ({ location }) => {
  return (
    <p>
      {location.address} {location.postalCode}, {location.city},{" "}
      {location.country}
    </p>
  );
};
