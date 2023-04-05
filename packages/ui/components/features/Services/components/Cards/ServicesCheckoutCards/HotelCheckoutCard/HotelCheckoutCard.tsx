import React from "react";
import { useTranslation } from "react-i18next";
import { BookedService } from "@features/API";

export interface HotelCheckoutCardProps {
  service: Pick<BookedService, "room">;
}

export const HotelCheckoutCard: React.FC<HotelCheckoutCardProps> = (props) => {
  const { t } = useTranslation();

  return <></>;
};
