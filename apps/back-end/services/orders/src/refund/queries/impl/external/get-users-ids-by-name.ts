import { GqlPaginationInput } from 'nest-utils';

export class GetUsersIdsByNameQuery {
  constructor(
    public readonly name: string,
    private readonly pagination: GqlPaginationInput,
  ) {}
}

export type GetUsersIdsByNameQueryRes = {
  id: string;
}[];
