export type QueryPaginationInputs = {
  take: number;
  page: number;
};

export type PaginationFetchedData<TData> = {
  hasMore: boolean;
  data: TData;
  total: number;
};
