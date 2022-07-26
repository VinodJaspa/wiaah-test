import { ServicesType } from "./ServicesTypes";

export interface ServiceViewListItem {
  search: React.ReactNode;
  details: React.ReactNode;
  searchResaults: React.ReactNode;
  searchList: React.ReactNode;
  slug: ServicesType;
}
