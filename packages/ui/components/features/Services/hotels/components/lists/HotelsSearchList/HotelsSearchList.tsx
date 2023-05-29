import { FilteredHotelsMetaDataType } from "api";
import { usePagination, useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { HotelRoom, useMutateFocusedMapItemId } from "@UI";

export interface HotelsSearchListProps {
  sorting?: boolean;
  horizontal?: boolean;
  rooms: HotelRoom[];
  total: number;
}

export const HotelsSearchList: React.FC<HotelsSearchListProps> = ({
  sorting,
  horizontal,
  rooms,
  total,
}) => {
  const { focusMapItem } = useMutateFocusedMapItemId();
  const { page, take } = usePagination();
  const { t } = useTranslation();

  let filters = {};
  let getLocationFilterQuery = "";
  const [services, setServices] = React.useState<FilteredHotelsMetaDataType[]>(
    rooms?.map((v) => ({
      date: v.createdAt,
      description: v.description,
      id: v.id,
      location: v.hotel?.location,
      pricePerNight: v.pricePerNight,
      rate: v.rating,
      reviews: v.reviews,
      serviceClass: 4,
      provider: "Seller",
      taxesAndFeesIncluded: true,
      thumbnail: v?.presentations[0]?.src,
      title: v.title,
      totalPrice: v.pricePerNight,
    })) || []
  );
  const { isTablet } = useResponsive();

  return null;
};
