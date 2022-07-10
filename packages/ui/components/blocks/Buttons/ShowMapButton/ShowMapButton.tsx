import React from "react";
import { useTranslation } from "react-i18next";
import { AspectRatio, Button } from "../../../partials";

export interface ShowMapButtonProps {
  onClick: () => any;
}

export const ShowMapButton: React.FC<ShowMapButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full">
      <AspectRatio ratio={7 / 20}>
        <img className="w-full h-full object-cover" src="/map.png" alt="map" />
      </AspectRatio>
      <Button
        onClick={onClick}
        className="whitespace-nowrap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {t("Show on map")}
      </Button>
    </div>
  );
};
