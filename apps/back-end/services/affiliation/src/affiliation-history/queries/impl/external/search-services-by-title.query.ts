import { GqlPaginationInput } from 'nest-utils';

export class SearchServicesByTitleQuery {
  constructor(
    public readonly filters: {
      title: string;
      price: number;
    },
    public readonly pagination: GqlPaginationInput,
  ) {}
}

export type SearchServicesByTitleQueryRes = {
  id: string;
}[];
