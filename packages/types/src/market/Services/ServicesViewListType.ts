import { ServicesType } from "./ServicesTypes";

export interface ServiceViewListItem<
  TSearchProps = {},
  TDetailsProps = {},
  TSearchResultsProps = {},
  TSearchListProps = {},
  TSearchHorizontalListProps = {}
  > {
  search: React.FC<Partial<TSearchProps>>;
  details: React.FC<Partial<TDetailsProps>> | null;
  searchResults: React.FC;
  searchList: React.FC<Partial<TSearchListProps>>;
  searchHorizontalList: React.FC<Partial<TSearchHorizontalListProps>> | null;
  slug: ServicesType;
}
