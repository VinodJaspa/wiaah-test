import React from "react";
import { HStack, WrappedMap, Marker, AspectRatio } from "@UI";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";
import { Location } from "@features/API";

export interface ServiceOnMapLocalizationSectionProps {
  location: Location;
}

export const ServiceOnMapLocalizationSection: React.FC<
  ServiceOnMapLocalizationSectionProps
> = ({ location }) => {
  const { t } = useTranslation();
  const mapRef = usePublishRef((keys) => keys.map);
  const localizationRef = usePublishRef((keys) => keys.localization);
  return (
    <div ref={localizationRef} className="flex flex-col gap-4">
      <p className="text-3xl font-bold" ref={mapRef ?? undefined}>
        {t("Show on map")}
      </p>
      <HStack className="rounded-3xl overflow-hidden">
        <AspectRatio ratio={3 / 5}>
          <WrappedMap
            className="w-full h-full"
            center={{ lat: location.lat, lng: location.long }}
            zoom={12}
          >
            <Marker position={{ lat: location.lat, lng: location.long }} />
          </WrappedMap>
        </AspectRatio>
      </HStack>
    </div>
  );
};
