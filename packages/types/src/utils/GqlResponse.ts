export interface GqlResponse<TData, Key extends string | null = null> {
  data: Key extends string ? Record<Key, TData> : TData;
  errors?: any[];
}
