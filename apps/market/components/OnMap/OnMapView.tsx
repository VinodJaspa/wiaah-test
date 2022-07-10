import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {
  Map,
  Marker,
  PriceConverter,
  ScrollableContainer,
  ScrollingWrapper,
  ServicesSearchList,
  useGetFilteredServicesMetaDataQuery,
  useSearchFilters,
} from "ui";
import { useRecoilValue } from "recoil";
import { PreferedCurrencyState } from "state";

export const OnMapView: React.FC = () => {
  const { filters } = useSearchFilters();
  const { data: services } = useGetFilteredServicesMetaDataQuery(filters);
  const currency = useRecoilValue(PreferedCurrencyState);
  return (
    <div className="w-screen h-[75vh] flex p-4 gap-4 justify-between">
      <ScrollingWrapper>
        <ServicesSearchList />
      </ScrollingWrapper>
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          center={{
            lat: 0,
            lng: 0,
          }}
          zoom={5}
          className="w-full h-full"
        >
          {Array.isArray(services)
            ? services.map((service, i) => (
                <Marker
                  title={`${service.title}`}
                  label={
                    currency
                      ? `${currency.currencySymbol}${
                          service.pricePerNight * currency.currencyRateToUsd
                        }`
                      : ""
                  }
                  icon={{
                    path: "M19 4H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.172a2 2 0 0 1 1.414.586l1.707 1.707a1 1 0 0 0 1.414 0l1.707-1.707A2 2 0 0 1 15.828 18H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z",
                    fillColor: "#fff",
                    fillOpacity: 1,
                    scale: 2.5,
                    scaledSize: { width: 100 },

                    labelOrigin: {
                      x: 12,
                      y: 11,
                    },
                  }}
                  key={i}
                  position={service.location}
                />
              ))
            : null}
        </Map>
      </Wrapper>
    </div>
  );
};
