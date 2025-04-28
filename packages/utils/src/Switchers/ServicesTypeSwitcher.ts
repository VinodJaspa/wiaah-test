import React from "react";
import { ServicesType, ServiceViewListItem } from "types";
import { runIfFn } from "../runIfFun";
import {
  HotelsSearchView,
  ResturantSearchView,
  ResturantSearchResultsView,
  HotelsSearchResultsView,
  HolidaysRentalSearchView,
  HolidaysRentalSearchResultsView,
  HealthCenterSearchResultsView,
  HealthCenterSearchView,
  ServicesSearchView,
  ServicesSearchResultsView,
  VehicleSearchView,
  VehicleSearchResultsView,
  BeautyCenterSearchView,
  BeautyCenterSearchResultsView,
  ServicesSearchResultsViewProps,
} from "../../../ui/components/blocks/ServiceSearch";
import { HotelsSearchList } from "ui/components/features/Services/hotels/components/lists";
import {
  HotelDetailsView,
  RestaurantDetailsView,
  HealthCenterDetailsView,
  VehicleServiceDetailsView,
  BeautyCenterServiceDetailsView,
} from "../../../ui/components/blocks//";
import {
  HealthCenterHorizontalCardsList,
  HealthCenterServiceSearchResultsList,
  HolidaysRentalSearchList,
  RecommendedBeautyCenterSearchList,
  ResturantHorizontalList,
  ResturantSearchList,
  ServicesSearchResultsList,
  VehicleSearchList,
  ResturantSearchListProps,
  HealthCenterServiceSearchResultsListProps,
  BeautyCenterSearchListProps,
} from "ui";

interface HotelDetailsViewProps {
  id: string;
}

export type getServiceViewType =
  | "search"
  | "resaults"
  | "list"
  | "horizontalList"
  | "details";
type GetServiceViewKeyType =
  | "SEARCH"
  | "RESAULTS"
  | "LIST"
  | "DETAILS"
  | "HORIZONTAL_LIST";
export const getServiceView: Record<GetServiceViewKeyType, getServiceViewType> =
{
  SEARCH: "search",
  RESAULTS: "resaults",
  LIST: "list",
  DETAILS: "details",
  HORIZONTAL_LIST: "horizontalList",
};

export const ServicesTypeSwitcher: React.FC<{
  serviceType: ServicesType;
  get:
  | getServiceViewType
  | ((keys: typeof getServiceView) => keyof typeof getServiceView);
  fallbackComponent?: React.ReactNode;
  props?: object;
}> = ({ get: Get, serviceType, fallbackComponent = null, props = {} }) => {
  const ServicesViewsList: ServiceViewListItem[] = [
    {
      slug: "hotel",
      search: HotelsSearchView,
      searchResults: HotelsSearchResultsView,
      searchList: HotelsSearchList,
      details: HotelDetailsView as React.FC<Partial<HotelDetailsViewProps>>,
      searchHorizontalList: null,
    },
    {
      slug: "restaurant",
      search: ResturantSearchView,
      searchResults: ResturantSearchResultsView,
      searchList: ResturantSearchList as React.FC<
        Partial<ResturantSearchListProps>
      >,
      details: RestaurantDetailsView,
      searchHorizontalList: ResturantHorizontalList,
    },
    {
      slug: "holiday_rentals",
      search: HolidaysRentalSearchView,
      searchResults: HolidaysRentalSearchResultsView,
      searchList: HolidaysRentalSearchList,
      details: null,
      searchHorizontalList: null,
    },
    {
      slug: "health_center",
      searchResults: HealthCenterSearchResultsView,
      search: HealthCenterSearchView,
      searchList: HealthCenterServiceSearchResultsList as React.FC<
        Partial<HealthCenterServiceSearchResultsListProps>
      >,
      details: HealthCenterDetailsView as React.FC<
        Partial<HotelDetailsViewProps>
      >,
      searchHorizontalList: HealthCenterHorizontalCardsList,
    },
    {
      slug: "general",
      search: ServicesSearchView,
      searchResults: ServicesSearchResultsView as React.FC<
        Partial<ServicesSearchResultsViewProps>
      >,
      searchList: ServicesSearchResultsList,
      details: null,
      searchHorizontalList: null,
    },
    {
      slug: "vehicle",
      search: VehicleSearchView,
      searchResults: VehicleSearchResultsView,
      searchList: VehicleSearchList,
      details: VehicleServiceDetailsView as React.FC<
        Partial<HotelDetailsViewProps>
      >,
      searchHorizontalList: null,
    },
    {
      slug: "beauty_center",
      search: BeautyCenterSearchView,
      searchResults: BeautyCenterSearchResultsView,
      searchList: RecommendedBeautyCenterSearchList as React.FC<
        Partial<BeautyCenterSearchListProps>
      >,
      details: BeautyCenterServiceDetailsView as React.FC<
        Partial<HotelDetailsViewProps>
      >,
      searchHorizontalList: null,
    },
  ];

  const getServiceComponent = (
    serviceIdx: number,
    get: getServiceViewType
  ): React.ReactElement<any, any> | null => {
    const service = ServicesViewsList[serviceIdx];
    switch (get) {
      case "search":
        return service.search
          ? React.createElement(service.search, props)
          : null;
      case "resaults":
        return service.searchResults
          ? React.createElement(service.searchResults, props)
          : null;
      case "list":
        return service.searchList
          ? React.createElement(service.searchList, props)
          : null;
      case "details":
        return service.details
          ? React.createElement(service.details, props)
          : null;
      case "horizontalList":
        return service.searchHorizontalList
          ? React.createElement(service.searchHorizontalList, props)
          : null;
      default:
        return null;
    }
  };

  const serviceIdx = ServicesViewsList.findIndex((s) => s.slug === serviceType);
  const serviceFound = serviceIdx > -1;

  if (!serviceFound)
    return runIfFn(fallbackComponent, {}) as React.ReactElement<
      any,
      any
    > | null;

  const selectedComponent =
    typeof Get === "function" ? Get(getServiceView) : Get;
  const componentToRender = serviceFound
    ? getServiceComponent(serviceIdx, selectedComponent as getServiceViewType)
    : null;

  return (
    componentToRender ||
    (runIfFn(fallbackComponent, {}) as React.ReactElement<any, any> | null)
  );
};
