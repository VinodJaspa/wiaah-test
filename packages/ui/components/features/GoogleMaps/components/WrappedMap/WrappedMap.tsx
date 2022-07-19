import React from "react";
import { MapProps, Map } from "../Map";
import { Wrapper } from "@googlemaps/react-wrapper";

export const WrappedMap: React.FC<MapProps> = (props) => {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <Map {...props} />
    </Wrapper>
  );
};
