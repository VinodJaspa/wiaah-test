import { ServiceViewListItem } from "types";
import {
  ServiceSearchView,
  ResturantSearchView,
  HolidaysRentalSearchView,
  HolidaysRentalSearchResaultsView,
  HotelsSearchResaultsView,
  ResturantSearchResultsView,
} from "../components/ServiceSearch";
import {
  HealthCenterServiceSearchResultsList,
  HolidaysRentalSearchList,
  ResturantSearchList,
} from "ui/components/features/Services";
import { ServicesSearchList } from "ui/components/blocks/ListDisplay";
import {
  HealthCenterSearchResultsView,
  HealthCenterSearchView,
} from "components/ServiceSearch/HealthCenter";

export const ServicesViewsList: ServiceViewListItem[] = [
  {
    slug: "hotel",
    search: ServiceSearchView,
    searchResaults: HotelsSearchResaultsView,
    searchList: ServicesSearchList,
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
    searchResaults: HolidaysRentalSearchResaultsView,
    searchList: HolidaysRentalSearchList,
  },
  {
    slug: "health_center",
    searchResaults: HealthCenterSearchResultsView,
    search: HealthCenterSearchView,
    searchList: HealthCenterServiceSearchResultsList,
  },
];
