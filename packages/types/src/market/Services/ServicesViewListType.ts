import { ServicesType } from "./ServicesTypes";

export interface ServiceViewListItem {
  search: React.ReactNode;
  searchResaults: React.ReactNode;
  searchList: React.ReactNode;
  slug: ServicesType;
}
