import { ServiceLocation } from "@features/API";
import React from "react";
import { HtmlDivProps } from "types";

export const LocationAddressDisplay: React.FC<{
  location: ServiceLocation;
}> = ({ location }) => {
  return (
    <p>
      {location.address} {location.postalCode}, {location.city},{" "}
      {location.country}
    </p>
  );
};
