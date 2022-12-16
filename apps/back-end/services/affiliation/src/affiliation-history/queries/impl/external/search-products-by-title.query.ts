import { GqlPaginationInput } from 'nest-utils';

export class SearchProductsByTitleQuery {
  constructor(
    public readonly filters: {
      title: string;
      price: number;
    },
    public readonly pagination: GqlPaginationInput,
  ) {}
}
export type SearchProductsByTitleQueryRes = {
  id: string;
}[];
