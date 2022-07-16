import { ServiceViewListItem } from "types";
import {
  ServicesSearchView,
  ResturantSearchView,
  HolidaysRentalSearchView,
  HolidaysRentalSearchResultsView,
  HotelsSearchResultsView,
  ResturantSearchResultsView,
  HealthCenterSearchResultsView,
  HealthCenterSearchView,
  ServicesSearchResultsView,
} from "@components";
import {
  HealthCenterServiceSearchResultsList,
  HolidaysRentalSearchList,
  ResturantSearchList,
  HotelsSearchList,
  ServicesSearchResultsList,
} from "ui";

export const ServicesViewsList: ServiceViewListItem[] = [
  {
    slug: "hotel",
    search: ServicesSearchView,
    searchResaults: HotelsSearchResultsView,
    searchList: HotelsSearchList,
  },
  {
    slug: "resturant",
    search: ResturantSearchView,
    searchResaults: ResturantSearchResultsView,
    searchList: ResturantSearchList,
  },
  {
    slug: "holidays_rentals",
    search: HolidaysRentalSearchView,
    searchResaults: HolidaysRentalSearchResultsView,
    searchList: HolidaysRentalSearchList,
  },
  {
    slug: "health_center",
    searchResaults: HealthCenterSearchResultsView,
    search: HealthCenterSearchView,
    searchList: HealthCenterServiceSearchResultsList,
  },
  {
    slug: "general",
    search: ServicesSearchView,
    searchResaults: ServicesSearchResultsView,
    searchList: ServicesSearchResultsList,
  },
];
