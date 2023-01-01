import { GqlPaginationInput } from 'nest-utils';

export class GetServiceIdsByNameQuery {
  constructor(
    public readonly name: string,
    public pagination: GqlPaginationInput,
  ) {}
}

export type GetServiceIdsByNameQueryRes = {
  id: string;
}[];
