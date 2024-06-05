import { FilteredHotelsMetaDataType } from "api";
import { usePagination, useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  HotelRoom,
  useGetFilteredHotelRoomsQuery,
  useMutateFocusedMapItemId,
} from "@UI";

export interface HotelsSearchListProps {}

export const HotelsSearchList: React.FC<HotelsSearchListProps> = ({}) => {
  const { data: filteredRooms } = useGetFilteredHotelRoomsQuery({
    maxPrice: 400,
    minPrice: 400,
  });

  const { focusMapItem } = useMutateFocusedMapItemId();
  const { page, take } = usePagination();
  const { t } = useTranslation();

  let filters = {};
  let getLocationFilterQuery = "";
  const condition = (room: HotelRoom) => {};
  const { isTablet } = useResponsive();
  // TODO: create hotels table

  return null;
};
