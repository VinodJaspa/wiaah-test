export interface GqlResponse<TData, Key extends string> {
  data: Record<Key, TData>;
  errors?: any[];
}
