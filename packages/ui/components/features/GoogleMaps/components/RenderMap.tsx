import { Wrapper } from "@googlemaps/react-wrapper";
import { LocationCords } from "api";
import React, { CSSProperties } from "react";
import { useRecoilValue } from "recoil";
import { PreferedCurrencyState } from "state";
import { AspectRatio } from "ui";
import {
  onMapLocation,
  useGetFocusedMapItemId,
  useGetMapLocationsState,
  useSetMapLocationsState,
} from "../state";

import { Map } from "./Map";
import { Marker } from "./Marker";

export const RenderMap: React.FC = () => {
  const { itemId } = useGetFocusedMapItemId();
  const currency = useRecoilValue(PreferedCurrencyState);
  const [map, setMap] = React.useState<HTMLElement>();
  const [center, setCenter] = React.useState<LocationCords>({
    lat: 45.464664,
    lng: 9.18854,
  });
  const [zoom, setZoom] = React.useState<number>(12);
  const { locations: services } = useGetMapLocationsState();
  const { setLocations } = useSetMapLocationsState();

  const handleFocusService = (serviceData: onMapLocation) => {
    try {
      const { lat, lng } = serviceData;
      setCenter({ lat, lng });
      setZoom(12);
      setLocations([serviceData]);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    if (itemId) {
      const service = services.find((s) => s.id === itemId);
      if (service) {
        handleFocusService(service);
      }
    }
  }, [itemId]);

  React.useEffect(() => {
    if (document) {
      if (!map) {
        const map = document.getElementById("serviceSearchMap");
        if (map) {
          setMap(map);
        }
      }
    }
  });
  React.useEffect(() => {
    if (document) {
      if (map) {
        const markers = map.querySelectorAll("[role='img']");
        markers.forEach((marker, i) => {
          // @ts-ignore
          marker.style.overflow = "";
          const spanStyles: CSSProperties = {
            backgroundColor: "white",
            position: "absolute",
            zIndex: 10000,
            color: "black",
            fontSize: "1rem",
            borderRadius: "2rem",
            whiteSpace: "nowrap",
            border: "2px solid black",
            paddingTop: "0.25rem",
            top: 0,
            left: 0,
            paddingBottom: "0.25rem",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            fontWeight: "bolder",
          };
          const ExistsSpan = marker.querySelectorAll("span");
          const spanText = `${currency.currencySymbol}${
            currency.currencyRateToUsd * services[i].price
          }`;
          let span: HTMLElement;
          if (ExistsSpan.length > 0) {
            span = ExistsSpan[0];
            span.innerText = spanText;
            span.onclick = () => handleFocusService(services[i]);
            Object.entries(spanStyles).forEach(([key, value]: [any, any]) => {
              span.style[key] = value;
            });
          } else {
            span = document.createElement("span");
            span.innerText = spanText;
            console.log(services[i]);
            span.onclick = () => handleFocusService(services[i]);
            Object.entries(spanStyles).forEach(([key, value]: [any, any]) => {
              span.style[key] = value;
            });
            marker.appendChild(span);
          }
        });
      }
    }
  }, [map, services]);
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <Map
        id="serviceSearchMap"
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPID}
        center={center}
        zoom={zoom}
        className="w-full h-full"
        fullscreenControl={false}
        styles={[
          {
            featureType: "all",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },

          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#e9edf7",
              },
            ],
          },
          {
            featureType: "landscape.natural.landcover",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#e9edf7",
              },
            ],
          },
        ]}
      >
        {Array.isArray(services)
          ? services.map((service, i) => (
              <Marker
                title={`${service.title}`}
                icon={{
                  path: "M88.289,181.749c-9.013,0-17.557,7.539-23.078,14.664c-8.295,10.71-15.8,18.384-56.441,21.163 c-8.991,0.615-11.172-4.716-6.065-12.14c9.181-13.347,10.345-31.198,10.345-61.554v-33.053c0-9.013,0.517-23.682,3.106-32.308 c5.2-17.361,18.944-42.648,54.88-42.648H174.59c9.013,0,23.682-0.359,32.564,1.164c18.531,3.187,46.286,14.479,46.286,53.548 v22.023c0,0,3.024,69.152-63.409,69.152C146.084,181.749,108.62,181.749,88.289,181.749z",
                  fillColor: "#fff",
                  fillOpacity: 0,
                  scale: 0.5,
                  strokeOpacity: 0,
                }}
                key={i}
                position={{ lat: service.lat, lng: service.lng }}
              />
            ))
          : null}
      </Map>
    </Wrapper>
  );
};
