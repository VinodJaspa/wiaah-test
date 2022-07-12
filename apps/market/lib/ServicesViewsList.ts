import { ServicesType, ServiceViewListItem } from "types";
import { ServiceSearchView, ResturantSearchView } from "@components";
import {
  HotelsSearchResaultsView,
  ResturantSearchResultsView,
} from "@components";

export const ServicesViewsList: ServiceViewListItem[] = [
  {
    slug: "hotel",
    search: ServiceSearchView,
    searchResaults: HotelsSearchResaultsView,
  },
  {
    slug: "resturant",
    search: ResturantSearchView,
    searchResaults: ResturantSearchResultsView,
  },
];
