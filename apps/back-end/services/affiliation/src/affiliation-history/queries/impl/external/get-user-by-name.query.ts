import { GqlPaginationInput } from 'nest-utils';

export class GetUsersByNameQuery {
  constructor(
    public readonly name: string,
    public pagination: GqlPaginationInput,
  ) {}
}
export type GetUsersByNameQueryRes = {
  id: string;
  name: string;
}[];
