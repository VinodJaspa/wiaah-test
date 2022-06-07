export interface FetchDataArrayResults<DataType> {
  total: number;
  hasMore: boolean;
  data: DataType[];
}
