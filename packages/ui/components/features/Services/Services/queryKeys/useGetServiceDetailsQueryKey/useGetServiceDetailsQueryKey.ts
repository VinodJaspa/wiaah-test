import { FormatedSearchableFilter } from "api";

export const GetServiceDetailsQueryKey = (
  filters: FormatedSearchableFilter
) => ["serviceDetails", { filters }];
