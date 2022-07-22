import { ServiceViewListItem } from "types";
import {
  ServicesSearchView,
  HotelsSearchView,
  ResturantSearchView,
  HolidaysRentalSearchView,
  HolidaysRentalSearchResultsView,
  HotelsSearchResultsView,
  ResturantSearchResultsView,
  HealthCenterSearchResultsView,
  HealthCenterSearchView,
  ServicesSearchResultsView,
  VehicleSearchResultsView,
  VehicleSearchView,
  HotelDetailsView,
  ResturantDetailsView,
} from "@components";
import {
  HealthCenterServiceSearchResultsList,
  HolidaysRentalSearchList,
  ResturantSearchList,
  HotelsSearchList,
  ServicesSearchResultsList,
  VehicleSearchList,
} from "ui";

export const ServicesViewsList: ServiceViewListItem[] = [
  {
    slug: "hotel",
    search: HotelsSearchView,
    searchResaults: HotelsSearchResultsView,
    searchList: HotelsSearchList,
    details: HotelDetailsView,
  },
  {
    slug: "resturant",
    search: ResturantSearchView,
    searchResaults: ResturantSearchResultsView,
    searchList: ResturantSearchList,
    details: ResturantDetailsView,
  },
  {
    slug: "holidays_rentals",
    search: HolidaysRentalSearchView,
    searchResaults: HolidaysRentalSearchResultsView,
    searchList: HolidaysRentalSearchList,
    details: null,
  },
  {
    slug: "health_center",
    searchResaults: HealthCenterSearchResultsView,
    search: HealthCenterSearchView,
    searchList: HealthCenterServiceSearchResultsList,
    details: null,
  },
  {
    slug: "general",
    search: ServicesSearchView,
    searchResaults: ServicesSearchResultsView,
    searchList: ServicesSearchResultsList,
    details: null,
  },
  {
    slug: "vehicle",
    search: VehicleSearchView,
    searchResaults: VehicleSearchResultsView,
    searchList: VehicleSearchList,
    details: null,
  },
];
