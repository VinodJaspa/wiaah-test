import React from "react";
import { ServiceLocation } from "api";
import { HStack, WrappedMap, Marker, AspectRatio } from "ui";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";

export interface ServiceOnMapLocalizationSectionProps extends ServiceLocation {}

export const ServiceOnMapLocalizationSection: React.FC<
  ServiceOnMapLocalizationSectionProps
> = ({ location }) => {
  const { t } = useTranslation();
  const mapRef = usePublishRef((keys) => keys.map);
  const localizationRef = usePublishRef((keys) => keys.localization);
  return (
    <div ref={localizationRef} className="flex flex-col gap-4">
      <p className="font-bold text-lg">{t("Localization")}</p>
      <p ref={mapRef ?? undefined}>{t("Show on map")}</p>
      <HStack>
        <AspectRatio ratio={3 / 6}>
          <WrappedMap
            className="w-full h-full"
            center={location.cords}
            zoom={12}
          >
            <Marker position={location.cords} />
          </WrappedMap>
        </AspectRatio>
      </HStack>
    </div>
  );
};
