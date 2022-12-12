import { GqlPaginationInput } from 'nest-utils';

export class GetSellersIdsByNameQuery {
  constructor(
    public readonly name: string,
    public readonly pagination: GqlPaginationInput,
  ) {}
}

export type GetSellersIdsByNameQueryRes = {
  ids: string[];
};
