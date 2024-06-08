import { ServicesType } from "./ServicesTypes";

export interface ServiceViewListItem {
  search: React.FC;
  details: React.FC;
  searchResaults: React.FC;
  searchList: React.FC;
  searchHorizontalList:React.FC;
  slug: ServicesType;
}
