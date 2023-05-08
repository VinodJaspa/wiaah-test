import React from "react";
import { HtmlDivProps } from "types";

export const LocationAddressDisplay: React.FC<{
  address: string;
  city: string;
  country: string;
  postalCode?: string;
  state?: string;
}> = ({ address, city, country, postalCode, ...props }) => {
  return (
    <p {...props}>
      {address} {postalCode}, {city}, {country}
    </p>
  );
};
