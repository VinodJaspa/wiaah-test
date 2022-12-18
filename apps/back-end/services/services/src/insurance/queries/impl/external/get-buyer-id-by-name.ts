import { accountType, GqlPaginationInput } from 'nest-utils';

export class GetAccountIdsByNameQuery {
  constructor(
    public name: string,
    public type: accountType,
    public pagination: GqlPaginationInput,
  ) {}
}

export type GetAccountIdsByNameQueryRes = {
  id: string;
}[];
